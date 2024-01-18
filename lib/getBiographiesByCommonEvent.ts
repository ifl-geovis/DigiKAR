import { Feature, LineString } from "geojson";
import { createDatabase } from "./createDatabase";

export const getBiographiesByCommonEvent = async (
  event: string,
  place: string
) => {
  const db = await createDatabase();

  const statement = await db.prepare(`
    WITH ordered_events AS (
      SELECT *,
        ST_Point(lng::FLOAT, lat::FLOAT) AS geom
      FROM state_calendar_erfurt
      WHERE 
        pers_id IN (
          SELECT DISTINCT pers_id
          FROM state_calendar_erfurt
          WHERE 
            event_type = ?
            AND "geonames address" LIKE ?
          )
        AND "geonames address" IS NOT NULL
        AND LEFT(event_start, 4) != '0000'
      ORDER BY LEFT(event_start, 4)::INTEGER
    )
    SELECT 
    json_object(
          'type',
          'Feature',
          'properties',
          json_object(
              -- id
              'id',
              pers_id,
              'name',
              FIRST(pers_name),
              -- events_array
              'events',
              json_group_array(
                  json_object(
                      'type', event_type,
                      'function', pers_function,
                      'value', event_value,
                      'place', "geonames address",
                      'start', event_start
                  )
              )
          ),
          'geometry',
          ST_AsGeoJSON(ST_MakeLine(LIST(geom)))::JSON
      ) AS feature
    FROM ordered_events
    GROUP BY pers_id;
  `);
  const res = await statement.all(event, place);
  await db.close();

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<LineString>[];
};
