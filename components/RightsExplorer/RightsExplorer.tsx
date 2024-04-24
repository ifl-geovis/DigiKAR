"use client";

import { mapToScale } from "@/lib/helpers";
import { RightsData } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useState } from "react";
import { MapProvider } from "react-map-gl/maplibre";
import { RightsExplorerContext } from "./RightsExplorerContext";
import MapState from "../MapState";
import { Layer } from "@/types/Layer";

type Props = PropsWithChildren<{
  data?: RightsData["features"];
  initialSymbolMap: Map<string, string>;
  initialOrder?: string[];
  colorMap: Map<string, string>;
  availableLayers?: Layer[];
}>;

const RightsExplorer: FC<Props> = ({
  data,
  initialOrder,
  initialSymbolMap,
  children,
  colorMap,
  availableLayers,
}) => {
  const attributeSet = new Set(
    data
      ?.map((d) => d.properties?.attributes)
      .flat()
      .map((d) => d.attributeName),
  );

  const [order, setOrder] = useState(initialOrder ?? Array.from(attributeSet));
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined,
  );
  const [symbolMap, setSymbolMap] = useState(initialSymbolMap);

  const initialColorScale = mapToScale(colorMap, "lightgrey");

  const [colorScale, setColorScale] = useState<
    ScaleOrdinal<string, string, string>
  >(() => initialColorScale);

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
        availableLayers,
      }}
    >
      <MapState availableLayers={availableLayers} data={data ?? []}>
        <MapProvider>{children}</MapProvider>
      </MapState>
    </RightsExplorerContext.Provider>
  );
};

export default RightsExplorer;
