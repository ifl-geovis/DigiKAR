"use client";

import { Layer } from "@/types/Layer";
import { LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useState } from "react";
import { MapProvider, ViewState } from "react-map-gl/maplibre";
import { MapStateContext } from "./MapStateContext";
import { Bbox } from "@/types/Bbox";

type Props = PropsWithChildren<{
  initialBbox: Bbox;
  availableLayers?: Layer[];
  initialZoom?: number;
}>;

const MapState: FC<Props> = ({
  initialBbox,
  initialZoom,
  availableLayers,
  children,
}) => {
  const initialBounds = new LngLatBounds(initialBbox);
  const [viewState, setViewState] = useState<ViewState>({
    longitude: initialBounds.getCenter().lng,
    latitude: initialBounds.getCenter().lat,
    zoom: initialZoom ?? 10,
  } as ViewState);

  const [bounds, setBounds] = useState<LngLatBounds>(initialBounds);

  const [layers, setLayers] = useState<Layer[]>(availableLayers ?? []);

  return (
    <MapStateContext.Provider
      value={{
        viewState,
        setViewState,
        layers,
        bounds,
        setBounds,
        setLayers,
      }}
    >
      <MapProvider>{children}</MapProvider>
    </MapStateContext.Provider>
  );
};

export default MapState;
