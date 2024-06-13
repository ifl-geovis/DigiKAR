import { Feature, LineString } from "geojson";
import { createDatabase } from "./createDatabase";

export const getBiographiesByCommonEvent = async (
  event: string,
  place: string,
) => {
  const db = await createDatabase();

  //TODO: remove where condition on lens as soon as student lens has person_id
  const statement = await db.prepare(`
    WITH ordered_events AS (
      FROM events
      WHERE 
        person_id IN (
          SELECT DISTINCT person_id
          FROM events
          WHERE 
            event_type = ?
            AND place_name_geonames ILIKE ?
            AND analytical_lens <> 'students'
          )
        AND place_name_geonames IS NOT NULL
      ORDER BY event_start
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
                      'function', person_function,
                      'value', event_value,
                      'place', place_name_geonames,
                      'start', event_start
                  )
              )
          ),
          'geometry',
          ST_AsGeoJSON(ST_MakeLine(LIST(place)))::JSON
      ) AS feature
    FROM ordered_events
    GROUP BY person_id;
  `);
  const res = await statement.all(event, place);
  await db.close();

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<LineString>[];
};
