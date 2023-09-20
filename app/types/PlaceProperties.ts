import { Position } from "geojson";

export type Holder = {
  holder?: string | null;
  holderConsolidated?: string | null;
};

export type SpaceEstablishingAttribute = {
  attributeName: string;
  values: Holder[];
};

export type PlaceProperties = {
  id?: number;
  place: string;
  attributes: SpaceEstablishingAttribute[];
};

export type AnsbachDataRaw = (PlaceProperties & { coordinates: Position })[];
