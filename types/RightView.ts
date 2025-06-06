import { FeatureCollection, Point } from "geojson";
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

export type RightEntry = {
  place_id: string;
  // to be removed
  attested_fuzzy: {
    kernel: string;
    support: string;
  };
  // to be removed
  attested_raw: string;
  attested_json: FuzzyTimeInterval; // rename to `attested`
  when: When;
  sources: string[];
  originators: string[];
  comments: string[];
  rightholders: RightHolder[];
  // top_levels are summarized "übergeordnete Herrschaften"?
  top_levels: string[];
  // remove md_suffixes?
  md_rights_held_by: number;
  md_disputed_by: number;
  md_rightholders_categories: string[];
};

type RightAttributes = {
  [K in Right]: RightEntry[];
};

export type RightViewPlaceJoin = {
  id: string;
  geometry: Point;
  label: string;
  earliest_attested: number;
  latest_attested: number;
  when: When;
} & RightAttributes;

export type RightViewPlaceJoinFC = FeatureCollection<Point, RightViewPlaceJoin>;
