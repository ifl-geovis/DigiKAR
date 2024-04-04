"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { PropsWithChildren, useState } from "react";
import { FC } from "react";
import { RightsExplorerContext } from "./RightsExplorerContext";
import { RightsData } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { mapToScale } from "@/lib/helpers";

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
  const uniqueSet = new Set(
    data
      ?.map((d) => d.properties?.attributes)
      .flat()
      .map((d) => d.attributeName),
  );

  const [order, setOrder] = useState(initialOrder ?? Array.from(uniqueSet));
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
        uniqueSet,
        setOrder,
        setActiveCategory,
        setColorScale,
        setSymbolMap,
      }}
    >
      {children}
    </RightsExplorerContext.Provider>
  );
};

export default RightsExplorer;
