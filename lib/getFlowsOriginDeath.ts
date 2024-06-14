import { Feature, LineString } from "geojson";
import { createDatabase } from "./createDatabase";

export const getFlowsOriginDeath = async (analyticalLens = `any`) => {
  const db = await createDatabase();

  const statement = await db.prepare(`
    WITH per_person AS (
      SELECT list(place_name ORDER BY event_value) AS place_names,
      LIST(place ORDER BY event_value) AS places
      FROM events
      WHERE
        event_type IN ('Tod', 'Geburt')
        AND place IS NOT NULL
        AND place_name IS NOT NULL
        AND event_analytical_lens LIKE ?
      GROUP BY person_id
        HAVING length(place_names) > 1
    ),
    per_person_with_geom AS (
      SELECT *,
        ST_AsGeoJSON(ST_MakeLine(places)) AS geometry
      FROM per_person
      WHERE geometry IS NOT NULL
    )
    SELECT COUNT(*)::INT AS value,
      geometry,
      place_names,
      place_names[1] AS birth_place,
      place_names[-1] AS death_place
    FROM per_person_with_geom
    GROUP BY geometry, place_names
    ORDER BY value DESC;
  `);

  const res = await statement.all(
    analyticalLens === "any" ? "%" : analyticalLens,
  );

  await db.close();

  return res.map(
    ({ value, birth_place, death_place, geometry }) =>
      ({
        type: "Feature",
        properties: { birth_place, death_place, value },
        geometry: JSON.parse(geometry),
      }) as Feature<LineString>,
  );
};
