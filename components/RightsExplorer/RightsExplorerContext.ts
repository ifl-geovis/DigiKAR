import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { Right } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { createContext, useContext } from "react";

export type TimeRange = {
  t: number;
  support: number;
};

export type RightRequest = {
  baseUrl: string;
  params?: string;
  needsTransform?: boolean;
};

type Context = {
  rightRequest: RightRequest;
  timeRange: TimeRange;
  order: string[];
  activeCategory?: string;
  symbolMap: Map<string, string>;
  colorScale: ScaleOrdinal<string, string, string>;
  attributeSet: Set<Right>;
  setActiveCategory: (
    category?: string | ((category?: string) => string | undefined),
  ) => void;
  setOrder: (order: string[]) => void;
  setSymbolMap: (symbolMap: Map<string, string>) => void;
  setColorScale: (scale: ScaleOrdinal<string, string, string>) => void;
  availableLayers?: Layer[];
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
