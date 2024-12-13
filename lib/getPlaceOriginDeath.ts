import { Feature, Point } from "geojson";
import { createDatabase } from "./createDatabase";

export const getPlaceOriginDeath = async () => {
  const db = await createDatabase();

  const res = await db.all(`
    WITH event_counts AS (
      SELECT
        place_name,
        place,
        event_type,
        COUNT(*) AS event_count
      FROM events
      WHERE
        event_type IN ('Tod', 'Geburt', 'Studium')
        AND place_name IS NOT NULL
        AND ST_IsValid(place)
      GROUP BY
        place_name,
        place,
        event_type
      ORDER BY place_name, event_type
    )
    SELECT
      place_name AS place,
      ST_AsGeoJson(place) AS geometry,
      json_group_array(
        json_object(
          'event_type', event_type,
          'count', event_count
        )
      ) AS events
    FROM event_counts
    GROUP BY
      place_name,
      place;
  `);

  await db.close();

  return res.map(
    ({ place, events, geometry }, id) =>
      ({
        type: "Feature",
        id,
        properties: { place, events: JSON.parse(events) },
        geometry: JSON.parse(geometry),
      }) as Feature<Point, { place: string; events: LifeEvent[] }>,
  );
};

export type LifeEvent = {
  event_type: string;
  count: number;
};
