import { Bbox } from "@/types/Bbox";
import pool from "./pool";
import { Point } from "geojson";
import { ansbachToRightSchema } from "./ansbachToRightSchema";
import { Right } from "@/types/PlaceProperties";

export type Row = {
  id: string;
  geometry: Point;
  label: string;
  place_attributes: { attributeName: Right; holders: holder[] }[];
};

type holder = {
  holder: string;
  holderConsolidated: string;
};

export const loadAnsbachData = async (bbox: Bbox) => {
  const [xmin, ymin, xmax, ymax] = bbox;
  const response = await pool.query(
    `
    SELECT id,
      ST_AsGeoJson(geom) AS geometry,
      place_attributes,
      label
    FROM ansbach_transformed
    WHERE geom && ST_MakeEnvelope($1, $2, $3, $4, 4326);`,
    [xmin, ymin, xmax, ymax],
  );
  const data = response.rows.map(
    (d: { geometry: string; label: string; place_attributes: string }) => ({
      geometry: JSON.parse(d.geometry),
      label: d.label,
      place_attributes: d.place_attributes && JSON.parse(d.place_attributes),
    }),
  ) as Row[];
  const transformed = ansbachToRightSchema(data);
  return transformed;
};
