import { Feature, Point } from "geojson";
import { createDatabase } from "./setupDatabase";
import { INTEGER, VARCHAR } from "@duckdb/node-api";

export const getOriginsByTimeRange = async (
  min: number,
  max: number,
  lens: string = "Universität Mainz Studierende",
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
          birth_place.place_name,
          'number',
          COUNT(DISTINCT study_events.person_name),
          'individuals',
          list(DISTINCT study_events.person_name)
      ),
      'geometry',
      ST_AsGeoJSON(birth_place.place)::JSON
  ) AS feature
  FROM
    events AS study_events
  JOIN
    events AS birth_place ON study_events.person_name = birth_place.person_name
  WHERE
    study_events.event_analytical_lens = $lens
    AND study_events.event_type IN ('Immatrikulation', 'Studium', 'Graduation', 'Promotion')
    AND study_events.event_date BETWEEN $min AND $max
    AND birth_place.event_type IN ('Geburt', 'Taufe')
  GROUP BY
    birth_place.place_name,
    birth_place.place
  HAVING
    birth_place.place_name IS NOT NULL AND
    birth_place.place IS NOT NULL;
  `);
  prepared.bind(
    {
      lens,
      min,
      max,
    },
    {
      lens: VARCHAR,
      min: INTEGER,
      max: INTEGER,
    },
  );
  const reader = await prepared.runAndReadAll();
  const res = reader.getRowObjects().map(({ feature }) => {
    const str = feature?.toString();
    return str ? JSON.parse(str) : null;
  });
  connection.closeSync();

  return res satisfies Feature<Point>[];
};
