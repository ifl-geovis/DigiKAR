import { PlacePropertiesGeneralized } from "@/types/PlaceProperties";
import { Feature, FeatureCollection, Point } from "geojson";
import { Row } from "./loadAnsbachData";
import { capitalize } from "./utils";

/**
 * Transform the query results into the right schema
 * @param data Data returned from the Database
 * @returns The schema for the right data
 */
export const ansbachToRightSchema = (
  data: Row[],
): FeatureCollection<Point, PlacePropertiesGeneralized> => {
  const features = data.map((row) => {
    const rights = row.place_attributes.map((right) => {
      const attributeName = capitalize(right.attributeName);
      const categories = right.holders.map((d) => d.holderConsolidated);
      const isShared = categories.length > 1;
      const isDisputed = false;
      return {
        attributeName,
        holders: {
          categories,
          isShared,
          isDisputed,
        },
      };
    });
    const feature = {
      type: "Feature",
      geometry: row.geometry,
      properties: {
        id: row.id,
        placeName: row.label,
        attributes: rights,
      },
    } satisfies Feature<Point>;
    return feature;
  });
  return {
    type: "FeatureCollection",
    features,
  };
};
