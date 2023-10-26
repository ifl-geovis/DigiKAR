import { Database } from "duckdb-async";
import { Feature, Point } from "geojson";

export const getPlaceOriginDeath = async () => {
  const db = await Database.create("./data/digikar.duckdb");
  db.run("LOAD spatial;");

  const res = await db.all(`
      SELECT
        COUNT(*) as value,
        ST_AsGeoJSON(
            ST_POINT(longitudes::DOUBLE, latitudes::DOUBLE)
        ) AS geometry,
        "geonames address" as place,
        event_type
      FROM university_mainz
      WHERE
        event_type IN ('Tod', 'Geburt') AND
        "geonames address" IS NOT NULL
        GROUP BY
            "geonames address",
            event_type,
            latitudes,
            longitudes;
  `);

  return res.map(
    ({ place, event_type, value, geometry }, id) =>
      ({
        type: "Feature",
        id,
        properties: { place, event_type, value },
        geometry: JSON.parse(geometry),
      } as Feature<Point>)
  );
};
