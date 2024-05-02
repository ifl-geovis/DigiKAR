import { Feature, Point, Position } from "geojson";
import { AnsbachDataRaw, PlaceProperties } from "../types/PlaceProperties";

export const loadAnsbachData = async () => {
  const response = await fetch(
    "https://api.geohistoricaldata.org/digikar/ansbach",
  );
  const ansbachData = (await response.json()).map(
    (d: { place: AnsbachDataRaw[number] }) => d.place,
  ) as AnsbachDataRaw;
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
