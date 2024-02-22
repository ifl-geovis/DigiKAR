import { ScaleOrdinal } from "d3";
import { Feature, GeoJsonProperties, Point } from "geojson";
import { createContext, useContext } from "react";

type Context = {
  order: string[];
  symbolMap: Map<string, string>;
  data: Feature<Point, GeoJsonProperties>[];
  colorScale: ScaleOrdinal<string, string, string>;
  setOrder: (order: string[]) => void;
  setSymbolMap: (symbolMap: Map<string, string>) => void;
  setColorScale: (scale: ScaleOrdinal<string, string, string>) => void;
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
