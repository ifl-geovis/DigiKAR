"use client";

import { Feature, GeoJsonProperties, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { PropsWithChildren, useState } from "react";
import { FC } from "react";
import { RightsExplorerContext } from "./RightsExplorerContext";
import colorScaleAnsbach from "@/lib/colorScaleAnsbach";

type Props = PropsWithChildren<{
  data?: Feature<Point, GeoJsonProperties>[];
  initialSymbolMap: Map<string, string>;
  initialOrder: string[];
}>;

const RightsMap: FC<Props> = ({
  data,
  initialOrder,
  initialSymbolMap,
  children,
}) => {
  const [order, setOrder] = useState(initialOrder);
  const [symbolMap, setSymbolMap] = useState(initialSymbolMap);

  const [colorScale, setColorScale] = useState<typeof colorScaleAnsbach>(
    () => colorScaleAnsbach,
  );
  return (
    <RightsExplorerContext.Provider
      value={{
        data: data ?? [],
        order,
        colorScale: colorScale,
        symbolMap,
        setOrder,
        setColorScale,
        setSymbolMap,
      }}
    >
      {children}
    </RightsExplorerContext.Provider>
  );
};

export default RightsMap;
