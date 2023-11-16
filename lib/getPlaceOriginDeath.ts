import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getPlaceOriginDeath = async () => {
  const db = await createDatabase();

  const res = await db.all(`
      SELECT
        COUNT(*)::INT as value,
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

  await db.close();

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
