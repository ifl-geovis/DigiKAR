import { FeatureCollection, Point } from "geojson";
import { RightholderEntity } from "./SummaryView";
import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";

export type Right =
  | "grundherrschaft"
  | "hochgericht"
  | "niedergericht"
  | "jagd"
  | "dorf_und_gemeindeherrschaft"
  | "kollatur"
  | "landeshoheit"
  | "kirchenpatronat";

export type Holder = {
  holder?: string;
  holderConsolidated?: string;
  year?: number;
  sources?: string;
  disputed_with?: string;
  comments?: string;
};

export type IndividualDatum = { name: string; type?: RightholderEntity };

export type PerspectiveDatum = string | IndividualDatum;
export type Perspectives = Record<Perspective, PerspectiveDatum[]>;

export type RightWithPerspectives = {
  heldBy: number;
  disputedBy: number;
} & Perspectives;

export type Attribute<T> = {
  attributeName: Right;
  holders: T;
};

export type PlaceProperties = {
  id?: string;
  placeName: string;
  attributes: Attribute<Holder[]>[];
};

export type PlacePropertiesWithPerspectives = {
  id: string;
  placeName: string;
  attributes: Attribute<RightWithPerspectives>[];
};

export type RightsData = FeatureCollection<Point, PlaceProperties>;
