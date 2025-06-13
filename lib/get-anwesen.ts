import { RightWithPerspectives } from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";

const category = new Map<string, string>([
  ["Kloster St. Marienstern", "mediate Geistlichkeit"],
  ["Landvogtei Bautzen", "weltliche Fürsten, Grafen, Herren"],
  ["Rittergut Räckelwitz", "mediater Adel"],
  ["Umstritten", "umstritten"],
]);

export const getAnwesen = async () => {
  try {
    const response = await fetch(
      "https://api.geohistoricaldata.org/digikar/anwesen.geojson",
    );
    if (!response.ok) {
      throw new Error(
        `PostgREST error: ${response.status} ${response.statusText}`,
      );
    }
    const fc: FeatureCollection<Point> = await response.json();
    const features = fc.features.map((f) => {
      const holderGs = f.properties?.["ghs-ks"];
      const holderNg = f.properties?.["ng-ks"];
      return {
        ...f,
        properties: {
          ...f.properties,
          Grundherrschaft: {
            categories: [category.get(holderGs) ?? ""],
            disputedBy: holderGs === "umstritten" ? 1 : 0,
            heldBy: 1,
            individuals: [],
            topLevels: [],
          } satisfies RightWithPerspectives,
          Niedergericht: {
            categories: [category.get(holderNg) ?? ""],
            disputedBy: holderNg === "umstritten" ? 1 : 0,
            heldBy: 1,
            individuals: [],
            topLevels: [],
          } satisfies RightWithPerspectives,
        },
      };
    });
    return { ...fc, features };
  } catch (error) {
    console.error("Failed to fetch anwesen:", error);
    return {
      type: "FeatureCollection",
      features: [],
    } satisfies FeatureCollection<Point>;
  }
};
