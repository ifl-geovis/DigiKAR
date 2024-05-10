import { Layer } from "@/types/Layer";
import { LngLatBounds } from "maplibre-gl";
import { createContext, useContext } from "react";
import { ViewState } from "react-map-gl";

type Context = {
  setViewState: (viewState: ViewState) => void;
  viewState: ViewState;
  setBounds: (bounds: LngLatBounds) => void;
  bounds: LngLatBounds;
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
};

export const MapStateContext = createContext<Context | null>(null);

export const useMapStateContext = () => {
  const context = useContext(MapStateContext);

  if (context == null) {
    throw new Error("MapState components must be wrapped in <MapState />");
  }

  return context;
};
