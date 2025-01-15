import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getOriginsByTimeRange = async (
  min: number,
  max: number,
  lens: string = "Universität Mainz Studierende",
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
    study_events.event_analytical_lens = ?
    AND study_events.event_type IN ('Immatrikulation', 'Studium', 'Graduation', 'Promotion')
    AND study_events.event_date BETWEEN ? AND ?
    AND birth_place.event_type IN ('Geburt', 'Taufe')
  GROUP BY
    birth_place.place_name,
    birth_place.place
  HAVING
    birth_place.place_name IS NOT NULL AND
    birth_place.place IS NOT NULL;
  `);
  const res = await statement.all(lens, min, max);
  await db.close();

  return res.map(({ feature }) => {
    return JSON.parse(feature);
  }) as Feature<Point>[];
};
