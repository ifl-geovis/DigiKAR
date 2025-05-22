import { Feature, Point } from "geojson";
import { createDatabase } from "./setup-database";
import { INTEGER, VARCHAR } from "@duckdb/node-api";

export const getMatriculations = async (
  min: number,
  max: number,
  eventType: string = "Immatrikulation",
) => {
  const db = await createDatabase();
  const connection = await db.connect();

  const prepared = await connection.prepare(`
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
      event_type = $eventType
      AND event_date BETWEEN $min AND $max
    GROUP BY place_name, place
    HAVING
      place_name IS NOT NULL AND
      place IS NOT NULL;
  `);
  prepared.bind(
    {
      eventType,
      min,
      max,
    },
    {
      eventType: VARCHAR,
      min: INTEGER,
      max: INTEGER,
    },
  );
  const reader = await prepared.runAndReadAll();
  const res = reader.getRowObjects().map(({ feature }) => {
    const str = feature?.toString();
    if (str) return JSON.parse(str);
  });
  connection.closeSync();

  return res satisfies Feature<Point>[];
};
