import { FeatureCollection, MultiPolygon } from "geojson";
import pool from "./pool";

const getVoronoi = async () => {
  const result = await pool.query(`
    WITH json AS (
      SELECT * FROM gis_unplugged.voronoi
    )
    SELECT ST_AsGeoJSON(json)::json AS feature
    FROM json;
  `);
  return {
    type: "FeatureCollection",
    features: result.rows.map((d) => d.feature),
  } as FeatureCollection<MultiPolygon>;
};

export default getVoronoi;
