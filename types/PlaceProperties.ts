import { FeatureCollection, Point } from "geojson";
import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";

export type Right =
  | "dorf_und_gemeindeherrschaft"
  | "grundherrschaft_separated_rightholder_types"
  | "hochgericht"
  | "jagd"
  | "kirchenhoheit"
  | "kirchenpatronat"
  | "kollatur"
  | "landeshoheit"
  | "niedergericht"
  | "vogtei_ausser_etters";

export type RightholderEntity = "Person" | "Körperschaft";

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

export function isIndividualDatum(
  datum: PerspectiveDatum,
): datum is IndividualDatum {
  return typeof datum === "object" && datum !== null && "name" in datum;
}

export type Perspectives = Record<Perspective, PerspectiveDatum[]>;

export type RightWithPerspectives = {
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
