import { HoldersGeneralized } from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";

const category = new Map<string, string>([
  ["Kloster St. Marienstern", "mediate Geistlichkeit"],
  ["Landvogtei Bautzen", "weltliche Fürsten, Grafen, Herren"],
  ["Rittergut Räckelwitz", "mediater Adel"],
  ["Umstritten", "umstritten"],
]);

export const getAnwesen = async () => {
  const response = await fetch(
    "https://api.geohistoricaldata.org/digikar/anwesen.geojson",
  );
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
          isDisputed: holderGs === "umstritten",
          isShared: false,
        } satisfies HoldersGeneralized,
        Niedergericht: {
          categories: [category.get(holderNg) ?? ""],
          isDisputed: holderNg === "umstritten",
          isShared: false,
        } satisfies HoldersGeneralized,
      },
    };
  });
  return { ...fc, features };
};
