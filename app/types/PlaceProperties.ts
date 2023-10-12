import { FeatureCollection, Position, Point } from "geojson";

export type Holder = {
  holder?: string;
  holderConsolidated?: string;
  year?: number;
  sources?: string;
  disputed_with?: string;
  comments?: string;
};

export type Attribute = {
  attributeName: string;
  holders: Holder[];
};

export type PlaceProperties = {
  id?: number;
  placeName: string;
  attributes: Attribute[];
};

export type RightsData = FeatureCollection<Point, PlaceProperties>;

export type AnsbachDataRaw = (PlaceProperties & { coordinates: Position })[];
