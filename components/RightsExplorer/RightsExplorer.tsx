"use client";

import { mapToScale } from "@/lib/helpers";
import { rightSet } from "@/lib/rightSet";
import { Bbox } from "@/types/Bbox";
import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { TooltipInfo } from "@/types/TooltipInfo";
import { ScaleOrdinal } from "d3";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useState } from "react";
import { MapProvider } from "react-map-gl/maplibre";
import MapState from "../MapState";
import {
  Perspective,
  RightsExplorerContext,
  TimeRange,
} from "./RightsExplorerContext";
import { Right } from "@/types/PlaceProperties";

type Props = PropsWithChildren<{
  initialBbox: Bbox;
  attributes: typeof rightSet;
  initialSymbolMap: Map<string, string>;
  initialOrder?: Right[];
  colorMap: Map<string, string>;
  availableLayers?: Layer[];
  initialTimeRange: TimeRange;
}>;

export type DataState = {
  isLoading?: boolean;
  error?: boolean;
};

const RightsExplorer: FC<Props> = ({
  initialTimeRange,
  attributes,
  initialBbox,
  initialOrder,
  initialSymbolMap,
  children,
  colorMap,
  availableLayers,
}) => {
  const [order, setOrder] = useState(
    initialOrder ?? [...attributes.keys()].map((relation) => relation),
  );

  const [isMultivariate, setIsMultivariate] = useState(true);

  const [perspective, setPerspective] = useState<Perspective>("category");

  const [selectedLegendItem, setSelectedLegendItem] = useState<
    string | undefined
  >(undefined);
  const [symbolMap, setSymbolMap] = useState(initialSymbolMap);

  const initialColorScale = mapToScale(colorMap, "lightgrey");

  const [detailInfo, setDetailInfo] = useState<DetailInfo | undefined>(
    undefined,
  );

  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | undefined>(
    undefined,
  );

  const [dataState, setDataState] = useState<DataState | undefined>(undefined);

  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

  const [colorScale, setColorScale] = useState<
    ScaleOrdinal<string, string, string>
  >(() => initialColorScale);

  return (
    <RightsExplorerContext.Provider
      value={{
        availableLayers,
        colorScale: colorScale,
        dataState,
        detailInfo,
        isMultivariate,
        order,
        perspective,
        rightSet,
        selectedLegendItem,
        symbolMap,
        timeRange,
        tooltipInfo,
        setColorScale,
        setDataState,
        setDetailInfo,
        setIsMultivariate,
        setPerspective,
        setOrder,
        setSelectedLegendItem,
        setSymbolMap,
        setTimeRange,
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
