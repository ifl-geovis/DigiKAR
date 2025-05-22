import { BiographyFlowExtened } from "@/types/Biography";
import { rollups } from "d3";

export type BiographyIndividuals = ReturnType<typeof flowsToIndividuals>;

export const flowsToIndividuals = (biographyFlows: BiographyFlowExtened[]) => {
  const persons = rollups(
    biographyFlows,
    (v) => {
      const [first] = v;
      const originDestinations = v.flatMap((d) => d.properties.events);
      return {
        personId: first.properties.personId,
        name: first.properties.name,
        color: first.properties.color,
        events: [
          originDestinations.at(0),
          ...originDestinations.slice(1, -1).filter((_, i) => i % 2),
          originDestinations.at(-1),
        ],
      };
    },
    (d) => d.properties.personId,
  ).map(([, v]) => v);
  return persons;
};
