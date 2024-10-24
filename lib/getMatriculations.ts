import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getMatriculations = async (
  min: number,
  max: number,
  eventType: string = "Immatrikulation",
) => {
  const db = await createDatabase();

  const statement = await db.prepare(`
    SELECT
    json_object(
          'type',
          'Feature',
          'properties',
          json_object(
              'place_name',
              place_name,
              'number',
              COUNT(*),
              'individuals',
              list(person_name)
          ),
          'geometry',
          ST_AsGeoJSON(place)::JSON
      ) AS feature
    FROM events
    WHERE
      event_type = ?
      AND event_date BETWEEN ? AND ?
    GROUP BY place_name, place
    HAVING
      place_name IS NOT NULL AND
      place IS NOT NULL;
  `);
  const res = await statement.all(eventType, min, max);
  await db.close();

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<Point>[];
};
