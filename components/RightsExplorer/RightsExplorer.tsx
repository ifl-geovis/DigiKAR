"use client";

import { rights, rightSet } from "@/lib/rightSet";
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
import { mapToScale } from "@/lib/helpers";

type Props = PropsWithChildren<{
  initialViewState: { longitude: number; latitude: number; zoom: number };
  attributes: typeof rightSet;
  initialSymbolMap: Map<string, string>;
  initialOrder?: Right[];
  availableLayers?: Layer[];
  initialTimeRange: TimeRange;
  colorMaps: Map<Perspective, Map<string, string>>;
}>;

export type DataState = {
  isLoading?: boolean;
  error?: boolean;
};

const RightsExplorer: FC<Props> = ({
  initialTimeRange,
  attributes,
  initialViewState,
  initialOrder,
  initialSymbolMap,
  children,
  availableLayers,
  colorMaps,
}) => {
  const [order, setOrder] = useState(
    initialOrder ?? [...attributes.keys()].map((relation) => relation),
  );

  const [univariateRight, setUnivariateRight] = useState(rights[2].relation);

  const [isMultivariate, setIsMultivariate] = useState(true);

  const [perspective, setPerspective] = useState<Perspective>("categories");

  const [selectedLegendItems, setSelectedLegendItems] = useState<string[]>([]);
  const [symbolMap, setSymbolMap] = useState(initialSymbolMap);

  const colorScales: Map<
    Perspective,
    ScaleOrdinal<string, string, string>
  > = new Map(
    [...colorMaps.entries()].map(([key, value]) => [
      key,
      mapToScale(value, "lightgrey"),
    ]),
  );

  const [detailInfo, setDetailInfo] = useState<DetailInfo | undefined>(
    undefined,
  );

  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | undefined>(
    undefined,
  );

  const [dataState, setDataState] = useState<DataState | undefined>(undefined);

  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

  return (
    <RightsExplorerContext.Provider
      value={{
        availableLayers,
        colorScales,
        dataState,
        detailInfo,
        isMultivariate,
        order,
        perspective,
        rightSet,
        selectedLegendItems,
        symbolMap,
        univariateRight,
        timeRange,
        tooltipInfo,
        setDataState,
        setDetailInfo,
        setIsMultivariate,
        setPerspective,
        setOrder,
        setSelectedLegendItems,
        setSymbolMap,
        setTimeRange,
        setUnivariateRight,
        setTooltipInfo,
      }}
    >
      <MapState
        availableLayers={availableLayers}
        initialCenter={{
          longitude: initialViewState.longitude,
          latitude: initialViewState.latitude,
        }}
        initialZoom={initialViewState.zoom}
      >
        <MapProvider>{children}</MapProvider>
      </MapState>
    </RightsExplorerContext.Provider>
  );
};

export default RightsExplorer;
