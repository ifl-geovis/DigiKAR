import { getClosestEntry } from "@/lib/getClosestEntry";
import { GeneralizedApiRight } from "@/types/GeneralizedEndpoint";
import {
  Attribute,
  RightWithPerspectives,
  PlacePropertiesWithPerspectives,
  Right,
} from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
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
): FeatureCollection<Point, PlacePropertiesWithPerspectives> => {
  const hasName = (d: string | undefined): d is string => {
    return d !== undefined;
  };

  const features = data.features.map((feature) => {
    const rights = Object.entries(feature.properties).reduce<
      Attribute<RightWithPerspectives>[]
    >((acc, [key, value]) => {
      if (key.match(/(_summary)$/)) {
        const attributeName = key.replace("_summary", "") as Right;
        //@ts-expect-error TS is not able to infer that value is always an entry
        const entry = getClosestEntry(t, value);
        const [categories, individuals, topLevels, heldBy, disputedBy] = [
          entry?.rightholders_individuals
            .map((d) => d.category)
            .filter(hasName) ?? [],
          entry?.rightholders_individuals.map(
            ({ type, rightholder_consolidated, rightholder }) => ({
              name: rightholder_consolidated ?? rightholder,
              type,
            }),
          ) ?? [],
          entry?.rightholders_individuals
            .map((d) => d.top_level)
            .filter(hasName) ?? [],
          entry?.rights_held_by ?? 0,
          entry?.rights_disputed_by ?? 0,
        ];
        const attribute = {
          attributeName,
          holders: { categories, individuals, topLevels, heldBy, disputedBy },
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
