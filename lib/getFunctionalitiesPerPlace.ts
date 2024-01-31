import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getFunctionalitiesPerPlace = async (
  table = "university_mainz",
  functions?: string[]
) => {
  const db = await createDatabase();

  const res = await db.all(`
    WITH functions_sum AS (
      SELECT 
        "geonames address" AS place,
        ST_POINT(longitudes::DOUBLE, latitudes::DOUBLE) AS point_geometry,
        TRIM(pers_function) AS function,
        TRIM(inst_name) AS institution,
        COUNT(*) AS count
      FROM ${table} t
      WHERE
        longitudes <> 'n/a'
        AND latitudes <> 'n/a'
        AND pers_function SIMILAR TO ${
          functions ? `'.*(${functions?.join("|")}).*'` : "('.*')"
        }
      GROUP BY
      "geonames address",
      point_geometry,
      TRIM(inst_name),
      TRIM(t.pers_function)
    )
    SELECT
      place,
      institution,
      ST_AsGeoJSON(point_geometry) as geometry,
      JSON_GROUP_OBJECT(function, count) AS functionalities
    FROM functions_sum
    GROUP BY
      place,
      institution,
      point_geometry;
  `);

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
      } as Feature<
        Point,
        {
          place: string;
          institution: string;
          functionalities: { function: number };
        }
      >)
  );
};
