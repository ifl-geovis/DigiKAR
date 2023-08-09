import { Position } from "geojson";

export type SpaceEstablishingAttribute = {
  attributeName: string;
  values: { holder?: string | null; holderConsolidated?: string | null }[];
};

export type PlaceProperties = {
  id?: number;
  place: string;
  attributes: SpaceEstablishingAttribute[];
};

export type AnsbachDataRaw = (PlaceProperties & { coordinates: Position })[];
