"use client";

import useRightData from "@/hooks/useRightData";
import { mapToScale } from "@/lib/helpers";
import { rights, rightSet } from "@/lib/right-set";
import { ColorMaps, ColorScales } from "@/types/ColorMaps";
import { DetailInfo } from "@/types/DetailInfo";
import { Layer } from "@/types/Layer";
import { Right } from "@/types/PlaceProperties";
import { TooltipInfo } from "@/types/TooltipInfo";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useState } from "react";
import { MapProvider } from "react-map-gl/maplibre";
import MapState from "../MapState";
import {
  Perspective,
  RightsExplorerContext,
  TimeRange,
} from "./RightsExplorerContext";

type Props = PropsWithChildren<{
  initialViewState: { longitude: number; latitude: number; zoom: number };
  attributes: typeof rightSet;
  initialSymbolMap: Map<string, string>;
  initialOrder?: Right[];
  availableLayers?: Layer[];
  initialTimeRange: TimeRange;
  colorMaps: ColorMaps;
}>;

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

  const [showIndividuals, setShowIndividuals] = useState(false);

  const [perspective, setPerspective] = useState<Perspective>("categories");

  const [selectedLegendItems, setSelectedLegendItems] = useState<string[]>([]);
  const [symbolMap, setSymbolMap] = useState(initialSymbolMap);

  const colorScales: ColorScales = colorMaps.map(
    ({ perspective, type, colorMap }) => {
      const scales = mapToScale(colorMap, "lightgrey");
      return { perspective, type, scale: scales };
    },
  );

  const [detailInfo, setDetailInfo] = useState<DetailInfo | undefined>(
    undefined,
  );

  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | undefined>(
    undefined,
  );

  const [rightsData, setRightsData] = useState<
    Awaited<ReturnType<typeof useRightData>> | undefined
  >(undefined);

  const [timeRange, setTimeRange] = useState<TimeRange>(initialTimeRange);

  const [onlyShowInView, setOnlyShowInView] = useState(false);

  return (
    <RightsExplorerContext.Provider
      value={{
        availableLayers,
        colorScales,
        rightsData,
        detailInfo,
        isMultivariate,
        showIndividuals,
        order,
        perspective,
        rightSet,
        selectedLegendItems,
        symbolMap,
        univariateRight,
        timeRange,
        tooltipInfo,
        onlyShowInView,
        setRightsData,
        setDetailInfo,
        setIsMultivariate,
        setPerspective,
        setOrder,
        setSelectedLegendItems,
        setShowIndividuals,
        setSymbolMap,
        setTimeRange,
        setUnivariateRight,
        setTooltipInfo,
        setOnlyShowInView,
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
