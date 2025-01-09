import { BiographyFlow } from "@/types/Biography";
import { scaleOrdinal, schemeCategory10 } from "d3";

export const addColorsToFlows = (flows: BiographyFlow[]) => {
  const colorDomain = flows.map((d) => d.properties?.personId);
  if (!colorDomain) return;
  const colorScale = scaleOrdinal(schemeCategory10).domain(colorDomain);
  return flows.map((d) => ({
    ...d,
    properties: { ...d.properties, color: colorScale(d.properties?.personId) },
  }));
};
