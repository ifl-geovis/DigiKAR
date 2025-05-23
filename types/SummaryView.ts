import { FuzzyTimeInterval } from "@/types/FuzzyTimeInterval";
import { When } from "@/types/When";
import { FeatureCollection } from "geojson";
import { Point } from "geojson";

export type RightholderEntity = "Person" | "Körperschaft";

// are actually summary views
type RightholderIndividual = {
  type?: RightholderEntity;
  source: string;
  category?: string; // is there a category like "unclear"? probably not
  top_level?: string;
  rightholder: string;
  rightholder_consolidated?: string; // technically should not be optional
  isDisputing: boolean; // is always false
};

export type RightEntry = {
  attested: FuzzyTimeInterval;
  place_id: string;
  place_label: string;
  place_ref: string; // API endpoint for this place
  rights_disputed_by: number;
  rights_held_by: number;
  rightholders_individuals: RightholderIndividual[];
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
  verwaltungszugehoerigkeit_summary: RightSummary[];
  when: When;
};

export type SummaryViewRights = FeatureCollection<Point, Properties>;
export type SummaryViewRightFeatures = SummaryViewRights["features"];
