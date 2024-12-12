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
    WITH ordered_events AS (
      FROM events
      WHERE 
        person_id IN (
          SELECT DISTINCT person_id
          FROM events
          WHERE 
            event_type = ?
            AND place_name ILIKE ?
            AND event_analytical_lens <> 'students'
          )
        AND place_name IS NOT NULL
      ORDER BY event_date
    )
    SELECT 
    json_object(
          'type',
          'Feature',
          'properties',
          json_object(
              -- id
              'id',
              person_id,
              'name',
              FIRST(person_name),
              -- events_array
              'events',
              json_group_array(
                  json_object(
                      'type', event_type,
                      'functionality', person_function,
                      'value', event_value,
                      'place', place_name,
                      'start', event_date_start
                  )
              )
          ),
          'geometry',
          ST_AsGeoJSON(ST_MakeLine(LIST(place)))::JSON
      ) AS feature
    FROM ordered_events
    GROUP BY person_id
    HAVING COUNT(*) >= 2;
  `);
  const res = await statement.all(event, place);
  connection.close();

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<
    LineString,
    {
      id: string;
      name: string;
      events: {
        type: string;
        functionality: string;
        value: string;
        place: string;
        start: string;
      }[];
    }
  >[];
};
