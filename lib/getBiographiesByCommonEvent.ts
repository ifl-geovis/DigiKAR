import { Feature, LineString } from "geojson";
import { getDatabase } from "./createDatabase";

export type BiographyEvent = {
  type: string;
  functionality: string;
  value: string;
  place: string;
  date: string;
  personFunction: string;
  institutionName: string;
};

type BiographyFlowProperties = {
  personId: string;
  name: string;
  eventIdx: number;
  totalEvents: number;
  progress: number;
  events: [BiographyEvent, BiographyEvent];
};

export const getBiographiesByCommonEvent = async (
  event: string,
  place: string,
  functionality: string,
  timeRange: [number, number],
) => {
  const db = await getDatabase();
  const connection = await db.connect();

  const statement = await connection.prepare(`
    WITH initial_events AS (
      FROM events
      WHERE
        place IS NOT NULL
        AND event_type = ?
        AND place_name ILIKE ?
        AND person_function ILIKE ?
        AND event_date BETWEEN ? AND ?
    ),
    ordered_events AS (
      SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY person_id ORDER BY event_value, event_date) AS rn,
        COUNT(*) OVER (PARTITION BY person_id) AS total_events
      FROM events
      WHERE
        person_id IN (SELECT DISTINCT person_id FROM initial_events)
        AND place IS NOT NULL
    ),
    filtered_events AS (
      FROM ordered_events
      WHERE total_events >= 2
    ),
    events_with_next AS (
      SELECT
        *,
        LEAD(event_type) OVER (PARTITION BY person_id ORDER BY rn) AS next_event_type,
        LEAD(person_function) OVER (PARTITION BY person_id ORDER BY rn) AS next_person_function,
        LEAD(institution_name) OVER (PARTITION BY person_id ORDER BY rn) AS next_institution_name,
        LEAD(event_value) OVER (PARTITION BY person_id ORDER BY rn) AS next_event_value,
        LEAD(place_name) OVER (PARTITION BY person_id ORDER BY rn) AS next_place_name,
        LEAD(event_date) OVER (PARTITION BY person_id ORDER BY rn) AS next_event_date,
        LEAD(place) OVER (PARTITION BY person_id ORDER BY rn) AS next_place
      FROM ordered_events
    )
    SELECT json_object(
      'type', 'Feature',
      'properties', json_object(
        'personId', person_id,
        'name', person_name,
        'eventIdx', rn,
        'totalEvents', total_events,
        'progress', (rn + 1) / total_events,
        'events', json_array(
          json_object(
            'type', event_type,
            'personFunction', person_function,
            'institutionName', institution_name,
            'eventValue', event_value,
            'place', place_name,
            'date', event_date
          ),
          json_object(
            'type', next_event_type,
            'personFunction', next_person_function,
            'institutionName', next_institution_name,
            'eventValue', next_event_value,
            'place', next_place_name,
            'date', next_event_date
          )
        )
      ),
      'geometry', ST_AsGeoJSON(
        ST_MakeLine(
          place,
          next_place
        )
      )
    ) AS feature
    FROM events_with_next
    WHERE
      next_event_type IS NOT NULL
      AND total_events >= 2;
  `);
  const res = await statement.all(
    event,
    place,
    functionality,
    timeRange[0],
    timeRange[1],
  );

  connection.close();

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<LineString, BiographyFlowProperties>[];
};
