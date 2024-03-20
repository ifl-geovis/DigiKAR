import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getMatriculations = async () => {
  const db = await createDatabase();

  const statement = await db.prepare(`
    SELECT
    json_object(
          'type',
          'Feature',
          'properties',
          json_object(
              'place_name',
              place_name_geonames,
              'number',
              COUNT(*)
          ),
          'geometry',
          ST_AsGeoJSON(place)::JSON
      ) AS feature
    FROM events
    WHERE
      event_type = 'Immatrikulation'
    GROUP BY place_name_geonames, place
    HAVING
      place_name_geonames IS NOT NULL AND
      place IS NOT NULL;
  `);
  const res = await statement.all();
  await db.close();

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<Point>[];
};
