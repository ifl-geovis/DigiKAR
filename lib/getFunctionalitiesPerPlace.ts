import { Database } from "duckdb-async";
import { Feature, Point } from "geojson";

export const getFunctionalitiesPerPlace = async (
  table = "university_mainz",
  functions?: string[]
) => {
  const db = await Database.create("./data/digikar.duckdb");
  db.run("LOAD spatial;");

  const res = await db.all(`
    WITH functions_sum AS (
      SELECT 
        "geonames address" as place,
        ST_POINT(longitudes::DOUBLE, latitudes::DOUBLE) AS point_geometry,
        TRIM(pers_function) as function,
        TRIM(inst_name) as institution,
        COUNT(*) as count
      FROM ${table}
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
      TRIM(${table}.pers_function)
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
