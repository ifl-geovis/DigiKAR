import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { Right } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { createContext, useContext } from "react";

export type TimeRange = {
  min: number;
  t: number;
  max: number;
};

export type TimeRangeHandle = keyof TimeRange;

export type RightRequest = {
  baseUrl: string;
  params?: string;
  needsTransform?: boolean;
};

type Context = {
  attributeSet: Set<Right>;
  availableLayers?: Layer[];
  rightRequest: RightRequest;
  timeRange: TimeRange;
  setTimeRange: (
    timeRange: TimeRange | ((timeRange: TimeRange) => TimeRange),
  ) => void;
  order: string[];
  setOrder: (order: string[]) => void;
  activeCategory?: string;
  setActiveCategory: (
    category?: string | ((category?: string) => string | undefined),
  ) => void;
  symbolMap: Map<string, string>;
  setSymbolMap: (symbolMap: Map<string, string>) => void;
  colorScale: ScaleOrdinal<string, string, string>;
  setColorScale: (scale: ScaleOrdinal<string, string, string>) => void;
  detailInfo?: DetailInfo;
  setDetailInfo: (detail?: DetailInfo) => void;
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
