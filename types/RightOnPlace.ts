import { Point } from "geojson";
import { When } from "./When";
import { FuzzyTimeInterval } from "./FuzzyTimeInterval";

type RightAttributes = {
  [K in "grundherrschaft" | "niedergericht"]: {
    place_id: string;
    attested_fuzzy: FuzzyTimeInterval;
    attested_raw: string;
  }[];
};

export type RightOnPlace = {
  id: string;
  geometry: Point;
  label: string;
  earliest_attested: number;
  latest_attested: number;
  when: When;
  // TODO: improve when typing
} & RightAttributes;
