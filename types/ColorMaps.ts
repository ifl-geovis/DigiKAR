import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";
import { RightholderEntity } from "./PlaceProperties";
import { ScaleOrdinal } from "d3";

type ColorMap = Map<string, string>;

export type ColorMaps = {
  perspective: Perspective;
  type?: RightholderEntity;
  colorMap: ColorMap;
}[];

export type ColorScales = {
  perspective: Perspective;
  type?: RightholderEntity;
  scale: ScaleOrdinal<string, string, string>;
}[];
