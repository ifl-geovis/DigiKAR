import { Feature, LineString } from "geojson";
import { getDatabase } from "./createDatabase";

export const getBiographiesByCommonEvent = async (
  event: string,
  place: string,
) => {
  const db = await getDatabase();
  const connection = await db.connect();

  //TODO: remove where condition on lens as soon as student lens has person_id
  const statement = await connection.prepare(`
    WITH initial_events AS (
      FROM events
      WHERE
        event_analytical_lens <> 'students'
        AND place IS NOT NULL
        AND event_type = ?
        AND place_name ILIKE ?
    ),
    ordered_events AS (
      SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY person_id ORDER BY event_value, event_date_start) AS rn,
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
        LEAD(event_value) OVER (PARTITION BY person_id ORDER BY rn) AS next_event_value,
        LEAD(place_name) OVER (PARTITION BY person_id ORDER BY rn) AS next_place_name,
        LEAD(event_date_start) OVER (PARTITION BY person_id ORDER BY rn) AS next_event_date_start,
        LEAD(place) OVER (PARTITION BY person_id ORDER BY rn) AS next_place
      FROM ordered_events
    )
    SELECT json_object(
      'type', 'Feature',
      'properties', json_object(
        'personId', person_id,
        'name', person_name,
        'order', rn,
        'progress', (rn + 1) / total_events,
        'events', json_array(
          json_object(
            'type', event_type,
            'personFunction', person_function,
            'eventValue', event_value,
            'place', place_name,
            'start', event_date_start
          ),
          json_object(
            'type', next_event_type,
            'personFunction', next_person_function,
            'eventValue', next_event_value,
            'place', next_place_name,
            'start', next_event_date_start
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
  const res = await statement.all(event, place);

  connection.close();

  type BiographyEvent = {
    type: string;
    functionality: string;
    value: string;
    place: string;
    start: string;
  };

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<
    LineString,
    {
      personId: string;
      name: string;
      order: number;
      progress: number;
      events: [BiographyEvent, BiographyEvent];
    }
  >[];
};
