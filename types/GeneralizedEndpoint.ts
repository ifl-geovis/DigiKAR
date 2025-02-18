import { FuzzyTimeInterval } from "@/types/FuzzyTimeInterval";
import { When } from "@/types/When";
import { FeatureCollection } from "geojson";
import { Point } from "geojson";

export type IndividualType = "Person" | "Körperschaft";

type RightholderIndividual = {
  type: IndividualType;
  source: string;
  category?: string;
  top_level?: string;
  rightholder: string;
  isDisputing: boolean;
  rightholder_consolidated?: string;
};

export type RightEntry = {
  attested: FuzzyTimeInterval;
  place_id: string;
  place_label: string;
  place_ref: string;
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

export type GeneralizedApiRight = FeatureCollection<Point, Properties>;
export type GeneralizedApiRightFeatures = GeneralizedApiRight["features"];
