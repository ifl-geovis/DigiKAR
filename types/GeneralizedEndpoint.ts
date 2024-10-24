import { FuzzyTimeInterval } from "@/types/FuzzyTimeInterval";
import { When } from "@/types/When";
import { FeatureCollection } from "geojson";
import { Feature, Point } from "geojson";

export type RightEntry = {
  attested: FuzzyTimeInterval;
  place_id: string;
  place_label: string;
  place_ref: string;
  rights_disputed_by: number;
  rights_held_by: number;
  rightholders_categories: string[];
};

export type RightSummary = RightEntry[];

export type Properties = {
  id: string;
  label: string;
  earliest_attested: number;
  latest_attested: number;
  grundherrschaft_summary: RightSummary[];
  niedergericht_summary: RightSummary[];
  hochgericht_summary: RightSummary[];
  landeshoheit_summary: RightSummary[];
  verwaltungzugehoerigkeit_summary: RightSummary[];
  when: When;
};

export type GeneralizedApiRight = FeatureCollection<Point, Properties>;
export type GeneralizedApiRightFeatures = Feature<Point, Properties>[];
