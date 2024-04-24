import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getPlaceOriginDeath = async () => {
  const db = await createDatabase();

  const res = await db.all(`
      SELECT
        Count()::INT AS value,
        place_name_geonames AS place,
        ST_AsGeoJson(place) AS geometry,
        event_type
      FROM events
      WHERE
        event_type IN ('Tod', 'Geburt')
        AND place_name_geonames IS NOT NULL
        AND ST_IsValid(place)
      GROUP BY
        place_name_geonames,
        place,
        event_type;
  `);

  await db.close();

  return res.map(
    ({ place, event_type, value, geometry }, id) =>
      ({
        type: "Feature",
        id,
        properties: { place, event_type, value },
        geometry: JSON.parse(geometry),
      }) as Feature<Point>,
  );
};
