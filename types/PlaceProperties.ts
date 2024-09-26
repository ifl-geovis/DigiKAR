import { FeatureCollection, Position, Point } from "geojson";

export type Holder = {
  holder?: string;
  holderConsolidated?: string;
  year?: number;
  sources?: string;
  disputed_with?: string;
  comments?: string;
};

export type HoldersGeneralized = {
  categories?: string[];
  heldBy: number;
  disputedBy: number;
};

export type Attribute<T> = {
  attributeName: string;
  holders: T;
};

export type PlaceProperties = {
  id?: string;
  placeName: string;
  attributes: Attribute<Holder[]>[];
};

export type PlacePropertiesGeneralized = {
  id?: string;
  placeName: string;
  attributes: Attribute<HoldersGeneralized>[];
};

export type RightsData = FeatureCollection<Point, PlaceProperties>;

export type AnsbachDataRaw = (PlaceProperties & { coordinates: Position })[];
