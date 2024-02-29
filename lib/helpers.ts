import { scaleOrdinal } from "d3";

export const mapToScale = (map: Map<string, string>, unknownValue: string) => {
  return scaleOrdinal<string, string, string>()
    .domain(map.keys())
    .range(map.values())
    .unknown(unknownValue);
};
