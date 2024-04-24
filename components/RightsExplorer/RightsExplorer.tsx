"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { PropsWithChildren, useMemo, useState } from "react";
import { FC } from "react";
import { RightsExplorerContext } from "./RightsExplorerContext";
import { RightsData } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { mapToScale } from "@/lib/helpers";
import { MapProvider, ViewState } from "react-map-gl/maplibre";
import { LngLatBounds } from "maplibre-gl";
import bbox from "@turf/bbox";
import { Layer } from "@/types/Layer";

type Props = PropsWithChildren<{
  data?: RightsData["features"];
  initialSymbolMap: Map<string, string>;
  initialOrder?: string[];
  colorMap: Map<string, string>;
}>;

const RightsExplorer: FC<Props> = ({
  data,
  initialOrder,
  initialSymbolMap,
  children,
  colorMap,
}) => {
  const attributeSet = new Set(
    data
      ?.map((d) => d.properties?.attributes)
      .flat()
      .map((d) => d.attributeName),
  );

  const bounds = useMemo(() => {
    const fc = {
      type: "FeatureCollection",
      features: data,
    };
    const [e, s, w, n] = bbox(fc);
    const bounds = [w, s, e, n] as [number, number, number, number];
    return new LngLatBounds(bounds);
  }, [data]);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: bounds.getCenter().lng,
    latitude: bounds.getCenter().lat,
    zoom: 10,
  } as ViewState);

  const [order, setOrder] = useState(initialOrder ?? Array.from(attributeSet));
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined,
  );
  const [symbolMap, setSymbolMap] = useState(initialSymbolMap);

  const initialColorScale = mapToScale(colorMap, "lightgrey");

  const [colorScale, setColorScale] = useState<
    ScaleOrdinal<string, string, string>
  >(() => initialColorScale);

  const [layers, setLayers] = useState<Layer[]>([
    { name: "Borders", visible: false },
  ]);

  return (
    <RightsExplorerContext.Provider
      value={{
        data: data ?? [],
        order,
        activeCategory,
        colorScale: colorScale,
        symbolMap,
        attributeSet,
        setOrder,
        setActiveCategory,
        setColorScale,
        setSymbolMap,
        viewState,
        setViewState,
        layers,
        setLayers,
      }}
    >
      <MapProvider>{children}</MapProvider>
    </RightsExplorerContext.Provider>
  );
};

export default RightsExplorer;
