import { getClosestEntry } from "@/lib/getClosestEntry";
import { GeneralizedApiRight } from "@/types/GeneralizedEndpoint";
import {
  Attribute,
  HoldersGeneralized,
  PlacePropertiesGeneralized,
} from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { capitalize } from "./utils";

/**
 * Transform the API response into the right schema
 * @param data Data returned from the API
 * @param t The time in years as integer
 * @returns The schema for the right data
 */
export const kursachsenToRightSchema = (
  data: GeneralizedApiRight,
  t: number,
): FeatureCollection<Point, PlacePropertiesGeneralized> => {
  const features = data.features.map((feature) => {
    const rights = Object.entries(feature.properties).reduce<
      Attribute<HoldersGeneralized>[]
    >((acc, [key, value]) => {
      if (key.match(/(_summary)$/)) {
        const attributeName = capitalize(
          key.replace("_summary", "").replace("oe", "ö"),
        );
        //@ts-expect-error TS is not able to infer that value is always an entry
        const entry = getClosestEntry(t, value);
        const categories = entry?.rightholders_categories;
        const isDisputed =
          entry?.rights_disputed_by && entry?.rights_disputed_by > 0
            ? true
            : false;
        const isShared =
          entry?.rights_held_by && entry.rights_held_by > 1 ? true : false;
        const attribute = {
          attributeName,
          holders: { categories, isDisputed, isShared },
        };
        acc.push(attribute);
      }
      return acc;
    }, []);
    const newFeature = {
      ...feature,
      properties: {
        id: feature.properties.id,
        placeName: feature.properties.label,
        attributes: rights,
      },
    };
    return newFeature;
  });
  return {
    type: "FeatureCollection",
    features,
  };
};
