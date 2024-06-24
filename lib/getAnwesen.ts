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
          holder: holderGs,
          category: category.get(holderGs),
          isDisputed: holderGs === "umstritten",
        },
        Niedergericht: {
          holder: holderNg,
          category: category.get(holderNg),
          isDisputed: holderNg === "umstritten",
        },
      },
    };
  });
  return { ...fc, features };
};
