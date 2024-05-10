"use client";

import { mapToScale } from "@/lib/helpers";
import { Bbox } from "@/types/Bbox";
import { Layer } from "@/types/Layer";
import { ScaleOrdinal } from "d3";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useState } from "react";
import { MapProvider } from "react-map-gl/maplibre";
import MapState from "../MapState";
import { RightsExplorerContext } from "./RightsExplorerContext";

type Props = PropsWithChildren<{
  initialBbox: Bbox;
  attributeSet: Set<string>;
  initialSymbolMap: Map<string, string>;
  initialOrder?: string[];
  colorMap: Map<string, string>;
  availableLayers?: Layer[];
}>;

const RightsExplorer: FC<Props> = ({
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

  const [colorScale, setColorScale] = useState<
    ScaleOrdinal<string, string, string>
  >(() => initialColorScale);

  return (
    <RightsExplorerContext.Provider
      value={{
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
      <MapState availableLayers={availableLayers} initialBbox={initialBbox}>
        <MapProvider>{children}</MapProvider>
      </MapState>
    </RightsExplorerContext.Provider>
  );
};

export default RightsExplorer;
