import { getClosestEntry } from "@/lib/get-closest-entry";
import {
  Attribute,
  RightWithPerspectives,
  PlacePropertiesWithPerspectives,
  Right,
  RightholderEntity,
} from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";
import { rightSet } from "./right-set";
import { RightViewPlaceJoinFC } from "@/types/RightView";

/**
 * Transform the API response into the correct schema
 * Select the most relevant entry for the given time range
 * @param data Data returned from the API
 * @param t A timeRange object
 * @returns The schema for the right data
 */
export const toRightSchema = (
  data: RightViewPlaceJoinFC,
  t: TimeRange,
  showIndividuals: boolean,
): FeatureCollection<Point, PlacePropertiesWithPerspectives> => {
  const hasName = (d: string | undefined): d is string => {
    return d !== undefined;
  };

  const features = data.features.map((feature) => {
    const rights = Object.entries(feature.properties).reduce<
      Attribute<RightWithPerspectives>[]
    >((acc, [key, value]) => {
      if ((rightSet.has as (k: Right) => boolean)(key as Right)) {
        const attributeName = key as Right;
        //@ts-expect-error TS is not able to infer that value is always an entry
        const entry = getClosestEntry(t, value);
        const [categories, individuals, topLevels, heldBy, disputedBy] = [
          entry?.rightholders.map((d) => d.category).filter(hasName) ?? [],
          entry?.rightholders
            // filter for Persons if showIndividuals is true
            // else include all other types (Körperschaft and undefined)
            .filter(({ type }) =>
              showIndividuals ? type === "Person" : type !== "Person",
            )
            .map(({ type, rightholder_consolidated, rightholder }) => ({
              name: rightholder_consolidated ?? rightholder,
              type: type as RightholderEntity,
            })) ?? [],
          entry?.rightholders.map((d) => d.top_level).filter(hasName) ?? [],
          entry?.md_rights_held_by ?? 0,
          entry?.md_disputed_by ?? 0,
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
