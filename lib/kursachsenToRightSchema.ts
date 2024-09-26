import { getClosestEntry } from "@/lib/getClosestEntry";
import { GeneralizedApiRight } from "@/types/GeneralizedEndpoint";
import {
  Attribute,
  HoldersGeneralized,
  PlacePropertiesGeneralized,
} from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { capitalize } from "./utils";
import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";

/**
 * Transform the API response into the right schema
 * @param data Data returned from the API
 * @param t A timeRange object
 * @returns The schema for the right data
 */
export const kursachsenToRightSchema = (
  data: GeneralizedApiRight,
  t: TimeRange,
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
        const [categories, heldBy, disputedBy] = [
          entry?.rightholders_categories,
          entry?.rights_held_by ?? 0,
          entry?.rights_disputed_by ?? 0,
        ];
        const attribute = {
          attributeName,
          holders: { categories, heldBy, disputedBy },
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
