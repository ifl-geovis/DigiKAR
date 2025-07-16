import { rightSet } from "@/lib/right-set";
import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { Right } from "@/types/PlaceProperties";
import { TooltipInfo } from "@/types/TooltipInfo";
import { createContext, useContext } from "react";
import useRightData from "@/hooks/useRightData";
import { ColorScales } from "@/types/ColorMaps";

export type TimeRange = {
  min: number;
  t: number;
  max: number;
};

export type TimeRangeHandle = keyof TimeRange;
export type Perspective = "individuals" | "categories" | "topLevels";

type Context = {
  rightSet: typeof rightSet;
  showIndividuals: boolean;
  setShowIndividuals: (showIndividuals: boolean) => void;
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
  colorScales: ColorScales;
  detailInfo?: DetailInfo;
  setDetailInfo: (detail?: DetailInfo) => void;
  tooltipInfo?: TooltipInfo;
  setTooltipInfo: (detail?: TooltipInfo) => void;
  rightsData?: Awaited<ReturnType<typeof useRightData>>;
  setRightsData: (data?: Awaited<ReturnType<typeof useRightData>>) => void;
  onlyShowInView: boolean;
  setOnlyShowInView: (value: boolean) => void;
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
