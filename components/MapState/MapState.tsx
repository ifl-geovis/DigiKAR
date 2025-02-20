"use client";

import { Layer } from "@/types/Layer";
import { LngLat, LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useState } from "react";
import { MapProvider, ViewState } from "react-map-gl/maplibre";
import { MapStateContext } from "./MapStateContext";

type Props = PropsWithChildren<{
  initialCenter: { longitude: number; latitude: number };
  availableLayers?: Layer[];
  initialZoom?: number;
}>;

const MapState: FC<Props> = ({
  initialCenter,
  initialZoom,
  availableLayers,
  children,
}) => {
  const { longitude, latitude } = initialCenter;
  const margin = 0.75;
  const sw = new LngLat(longitude - margin, latitude - margin);
  const ne = new LngLat(longitude + margin, latitude + margin);
  const initialBounds = new LngLatBounds(sw, ne);
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
