import useRightData from "@/hooks/useRightData";
import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";
import { isIndividualDatum } from "@/types/PlaceProperties";

export const reduceToUniqueHolders = (
  data: ReturnType<typeof useRightData>["data"],
  perspective: Perspective,
  showIndividuals: boolean,
) => {
  if (!data || !data.features) return [];

  //   const uniqueHolders = new Set<string>();

  return data.features
    .slice()
    .flatMap((feature) =>
      feature.properties.attributes.flatMap(({ holders }) =>
        holders[perspective]?.map((holder) => {
          if (isIndividualDatum(holder)) {
            if (showIndividuals && holder.type === "Person") {
              return holder.name;
            } else if (!showIndividuals && holder.type === "Körperschaft") {
              return holder.name;
            }
          }
          return holder;
        }),
      ),
    )
    .filter((v): v is string => typeof v === "string")
    .reduce((acc: string[], curr) => {
      if (curr && !acc.includes(curr.normalize())) {
        acc.push(curr.normalize());
      }
      return acc;
    }, []);
};
