import { FeatureCollection, Point } from "geojson";

export type Right =
  | "grundherrschaft"
  | "hochgericht"
  | "niedergericht"
  | "jagd"
  | "dorf_und_gemeindeherrschaft"
  | "kollatur"
  | "landeshoheit"
  | "kirchenpatronat"
  | "verwaltungzugehoerigkeit";

export type Holder = {
  holder?: string;
  holderConsolidated?: string;
  year?: number;
  sources?: string;
  disputed_with?: string;
  comments?: string;
};

export type HoldersGeneralized = {
  categories?: Array<string | undefined>;
  heldBy: number;
  disputedBy: number;
};

export type Attribute<T> = {
  attributeName: Right;
  holders: T;
};

export type PlaceProperties = {
  id?: string;
  placeName: string;
  attributes: Attribute<Holder[]>[];
};

export type PlacePropertiesGeneralized = {
  id: string;
  placeName: string;
  attributes: Attribute<HoldersGeneralized>[];
};

export type RightsData = FeatureCollection<Point, PlaceProperties>;
