import { rightSet } from "@/lib/rightSet";
import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { TooltipInfo } from "@/types/TooltipInfo";
import { ScaleOrdinal } from "d3";
import { createContext, useContext } from "react";
import { DataState } from "./RightsExplorer";
import { Right } from "@/types/PlaceProperties";

export type TimeRange = {
  min: number;
  t: number;
  max: number;
};

export type TimeRangeHandle = keyof TimeRange;
export type Perspective = "individual" | "category" | "top_level";

type Context = {
  rightSet: typeof rightSet;
  perspective: Perspective;
  setPerspective: (perspective: Perspective) => void;
  availableLayers?: Layer[];
  timeRange: TimeRange;
  setTimeRange: (
    timeRange: TimeRange | ((timeRange: TimeRange) => TimeRange),
  ) => void;
  order: Right[];
  setOrder: (order: Right[]) => void;
  selectedLegendItem?: string;
  setSelectedLegendItem: (
    legendItem?: string | ((legendItem?: string) => string | undefined),
  ) => void;
  symbolMap: Map<string, string>;
  setSymbolMap: (symbolMap: Map<string, string>) => void;
  colorScale: ScaleOrdinal<string, string, string>;
  setColorScale: (scale: ScaleOrdinal<string, string, string>) => void;
  detailInfo?: DetailInfo;
  setDetailInfo: (detail?: DetailInfo) => void;
  tooltipInfo?: TooltipInfo;
  setTooltipInfo: (detail?: TooltipInfo) => void;
  dataState?: DataState;
  setDataState: (dataState: DataState) => void;
};

export const RightsExplorerContext = createContext<Context | null>(null);

export const useRightsExplorerContext = () => {
  const context = useContext(RightsExplorerContext);

  if (context == null) {
    throw new Error(
      "RightsExplorer components must be wrapped in <RightsExplorer />",
    );
  }

  return context;
};
