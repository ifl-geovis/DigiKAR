import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getFunctionalitiesPerPlace = async (
  table = "university_mainz",
  functions?: string[]
) => {
  const db = await createDatabase();

  const statement = await db.prepare(`
    WITH functions_sum AS (
      SELECT 
        FIRST(place_name_geonames) AS place_name,
        place,
        person_function AS function,
        institution_name AS institution,
        COUNT(*) AS count
      FROM events e
      WHERE
        analytical_lense LIKE ?
        AND place IS NOT NULL
        AND place_name_geonames IS NOT NULL
        AND person_function SIMILAR TO ?
      GROUP BY
        place,
        institution_name,
        person_function
      HAVING
        place IS NOT NULL
        AND institution_name IS NOT NULL
    )
    SELECT
      FIRST(place_name) as place,
      institution,
      ST_AsGeoJSON(place) AS geometry,
      JSON_GROUP_OBJECT(function, count) AS functionalities
    FROM functions_sum
    GROUP BY
      place,
      institution;
  `);

  const res = await statement.all(
    table ?? "%",
    functions ? `'.*(${functions?.join("|")}).*'` : ".*"
  );

  await db.close();

  return res.map(
    ({ place, functionalities, institution, geometry }, id) =>
      ({
        id,
        type: "Feature",
        properties: {
          place,
          institution,
          functionalities: JSON.parse(functionalities),
        },
        geometry: JSON.parse(geometry),
      }) as Feature<
        Point,
        {
          place: string;
          institution: string;
          functionalities: { function: number };
        }
      >
  );
};
