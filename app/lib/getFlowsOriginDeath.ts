import { Database } from "duckdb-async";
import { Feature, LineString } from "geojson";

export const getFlowsOriginDeath = async (table = "university_mainz") => {
  const db = await Database.create("./app/data/digikar.duckdb");
  db.run("LOAD spatial;");

  const res = await db.all(`
    WITH deaths_births AS (
      SELECT *, ST_POINT(longitudes::DOUBLE, latitudes::DOUBLE) AS geom
      FROM ${table}
      WHERE
        event_type IN ('Tod', 'Geburt') AND
        "geonames address"!='nan' 
        AND "geonames address" IS NOT NULL),
    place_combinations AS (
      PIVOT deaths_births
      ON event_type
      USING FIRST("geonames address") AS place,
        FIRST(geom) AS geom,
      GROUP BY pers_ID
    )
    SELECT COUNT(*) AS value,
      Geburt_place AS birth_place,
      Tod_place AS death_place,
      ST_AsGeoJSON(ST_MakeLine(Geburt_geom, Tod_geom)) AS geometry
    FROM place_combinations
    GROUP BY Tod_place, Geburt_place, Geburt_geom, Tod_geom
    ORDER BY COUNT(*) DESC;
  `);

  return res.map(
    ({ value, birth_place, death_place, geometry }) =>
      ({
        type: "Feature",
        properties: { birth_place, death_place, value },
        geometry: JSON.parse(geometry),
      } as Feature<LineString>)
  );
};
