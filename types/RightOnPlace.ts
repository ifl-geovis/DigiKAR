import { Point } from "geojson";
import { When } from "./When";
import { FuzzyTimeInterval } from "./FuzzyTimeInterval";
import { Right } from "./PlaceProperties";

type RightHolder = {
  type: string;
  category: string;
  rightholder: string;
  is_disputing: boolean;
  source: string;
  top_level: string;
  rightholder_consolidated: string;
};

type RightAttributes = {
  [K in Right]: {
    place_id: string;
    attested_fuzzy: {
      kernel: string;
      support: string;
    };
    attested_raw: string;
    attested_json: FuzzyTimeInterval;
    when: When;
    sources: string[];
    originators: string[];
    comments: string[];
    rightholders: RightHolder[];
    // top_levels are summarized "übergeordnete Herrschaften"?
    top_levels: string[];
    md_rights_held_by: number;
    md_disputed_by: number;
    md_rightholders_categories: string[];
  }[];
};

export type RightOnPlace = {
  id: string;
  geometry: Point;
  label: string;
  earliest_attested: number;
  latest_attested: number;
  when: When;
} & RightAttributes;
