import { Feature, Point } from "geojson";
import { createDatabase } from "./setupDatabase";

export const getPlaceOriginDeath = async () => {
  const db = await createDatabase();
  const connection = await db.connect();

  const query = await connection.runAndReadAll(`
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
      ST_AsGeoJson(place)::JSON AS geometry,
      list(
        {
          'event_type': event_type,
          'count': event_count
        }
      ) AS events
    FROM event_counts
    GROUP BY
      place_name,
      place;
  `);

  const res = query
    .getRowObjectsJson()
    .map(({ place, events, geometry }, id) => {
      const geometryStr = geometry?.toString();
      return {
        type: "Feature",
        id,
        properties: { place, events },
        geometry: geometryStr ? JSON.parse(geometryStr) : null,
      } as Feature<Point, { place: string; events: LifeEvent[] }>;
    });

  connection.close();

  return res;
};

export type LifeEvent = {
  event_type: string;
  count: number;
};
