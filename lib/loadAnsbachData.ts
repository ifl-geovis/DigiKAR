import { promises as fs } from "fs";
import { Feature, Point, Position } from "geojson";
import { AnsbachDataRaw, PlaceProperties } from "../types/PlaceProperties";

export const loadAnsbachData = async () => {
  const file = await fs.readFile("./data/ansbach.json", "utf-8");
  const ansbachData = (await JSON.parse(file)) as AnsbachDataRaw;
  const data = {
    type: "FeatureCollection" as const,
    features: ansbachData
      .filter((d) => d.coordinates)
      .map((d, i) => {
        const feature: Feature<Point, PlaceProperties> = {
          type: "Feature",
          properties: { ...d, id: i },
          geometry: {
            type: "Point",
            coordinates: d.coordinates as Position,
          },
        };
        return feature;
      }),
  };
  return data;
};
