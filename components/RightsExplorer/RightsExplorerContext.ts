import { rightSet } from "@/lib/rightSet";
import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { Right } from "@/types/PlaceProperties";
import { TooltipInfo } from "@/types/TooltipInfo";
import { ScaleOrdinal } from "d3";
import { createContext, useContext } from "react";
import { DataState } from "./RightsExplorer";

export type TimeRange = {
  min: number;
  t: number;
  max: number;
};

export type TimeRangeHandle = keyof TimeRange;
export type Perspective = "individuals" | "categories" | "topLevels";

type Context = {
  rightSet: typeof rightSet;
  isMultivariate: boolean;
  setIsMultivariate: (isMultivariate: boolean) => void;
  univariateRight: Right;
  setUnivariateRight: (right: Right) => void;
  perspective: Perspective;
  setPerspective: (perspective: Perspective) => void;
  availableLayers?: Layer[];
  timeRange: TimeRange;
  setTimeRange: (
    timeRange: TimeRange | ((timeRange: TimeRange) => TimeRange),
  ) => void;
  order: Right[];
  setOrder: (order: Right[]) => void;
  selectedLegendItems: string[];
  setSelectedLegendItems: (
    legendItem: string[] | ((legendItem: string[]) => string[]),
  ) => void;
  symbolMap: Map<string, string>;
  setSymbolMap: (symbolMap: Map<string, string>) => void;
  colorScales: Map<Perspective, ScaleOrdinal<string, string, string>>;
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
