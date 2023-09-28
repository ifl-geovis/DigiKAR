import { Database } from "duckdb-async";
import { Feature, LineString } from "geojson";

export const getFunctionsPerPlace = async (table = "university_mainz") => {
  const db = await Database.create("./app/data/digikar.duckdb");
  db.run("LOAD spatial;");

  const res = await db.all(`
    WITH functions_sum AS (
      SELECT "geonames address" as place, pers_function as function, COUNT(*) as count
      FROM ${table}
      GROUP BY "geonames address", ${table}.pers_function
    )
    SELECT place, JSON_GROUP_OBJECT(function, count) AS functions
    FROM functions_sum
    -- JOIN ${table} ON (functions_sum.place = ${table}."geonames address")
    GROUP BY place;
  `);

  return res.map(
    ({ place, functions }) =>
      ({
        type: "Feature",
        properties: {
          place,
          functions,
        },
        geometry: undefined,
        // geometry: JSON.parse(geometry),
      } as Feature<LineString>)
  );
};
