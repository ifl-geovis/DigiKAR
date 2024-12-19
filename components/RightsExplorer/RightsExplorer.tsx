"use client";

import { mapToScale } from "@/lib/helpers";
import { Bbox } from "@/types/Bbox";
import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { Right } from "@/types/PlaceProperties";
import { TooltipInfo } from "@/types/TooltipInfo";
import { ScaleOrdinal } from "d3";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useState } from "react";
import { MapProvider } from "react-map-gl/maplibre";
import MapState from "../MapState";
import {
  RightRequest,
  RightsExplorerContext,
  TimeRange,
} from "./RightsExplorerContext";

type Props = PropsWithChildren<{
  initialBbox: Bbox;
  attributeSet: Set<Right>;
  initialSymbolMap: Map<string, string>;
  initialOrder?: string[];
  colorMap: Map<string, string>;
  availableLayers?: Layer[];
  rightRequest: RightRequest;
  initialTimeRange: TimeRange;
}>;

const RightsExplorer: FC<Props> = ({
  rightRequest,
  initialTimeRange,
  attributeSet,
  initialBbox,
  initialOrder,
  initialSymbolMap,
  children,
  colorMap,
  availableLayers,
}) => {
  const [order, setOrder] = useState(initialOrder ?? Array.from(attributeSet));
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined,
  );
  const [symbolMap, setSymbolMap] = useState(initialSymbolMap);

  const initialColorScale = mapToScale(colorMap, "lightgrey");

  const [detailInfo, setDetailInfo] = useState<DetailInfo | undefined>(
    undefined,
  );

  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | undefined>(
    undefined,
  );

  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

  const [colorScale, setColorScale] = useState<
    ScaleOrdinal<string, string, string>
  >(() => initialColorScale);

  return (
    <RightsExplorerContext.Provider
      value={{
        rightRequest,
        timeRange,
        order,
        setTimeRange,
        activeCategory,
        colorScale: colorScale,
        symbolMap,
        attributeSet,
        setOrder,
        setActiveCategory,
        setColorScale,
        setSymbolMap,
        availableLayers,
        detailInfo,
        setDetailInfo,
        tooltipInfo,
        setTooltipInfo,
      }}
    >
      <MapState availableLayers={availableLayers} initialBbox={initialBbox}>
        <MapProvider>{children}</MapProvider>
      </MapState>
    </RightsExplorerContext.Provider>
  );
};

export default RightsExplorer;
