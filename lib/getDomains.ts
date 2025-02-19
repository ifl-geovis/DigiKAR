import { interpolateHslLong } from "d3";

export const getTopLevelDomain = async () => {
  const url = "https://api.geohistoricaldata.org/digikar/all_top_levels";
  const response = await fetch(url);
  const json = (await response.json()) as { top_level: string }[];
  return new Map(
    json.map(({ top_level }, i, arr) => [
      top_level,
      interpolateHslLong("purple", "red")(i / arr.length),
    ]),
  );
};
export const getIndividualsDomain = async () => {
  const url = "https://api.geohistoricaldata.org/digikar/all_individuals";
  const response = await fetch(url);
  const json = (await response.json()) as {
    rightholder_consolidated: string;
  }[];
  return new Map(
    json.map(({ rightholder_consolidated }, i, arr) => [
      rightholder_consolidated,
      interpolateHslLong("purple", "red")(i / arr.length),
    ]),
  );
};
