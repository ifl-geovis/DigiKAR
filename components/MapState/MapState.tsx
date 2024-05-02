"use client";

import { Layer } from "@/types/Layer";
import bbox from "@turf/bbox";
import { Feature, GeoJsonProperties, Point } from "geojson";
import { LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { MapProvider, ViewState } from "react-map-gl/maplibre";
import { MapStateContext } from "./MapStateContext";
import { bBoxGermany } from "@/lib/bBoxGermany";

type Props = PropsWithChildren<{
  data?: Feature<Point, GeoJsonProperties>[];
  availableLayers?: Layer[];
}>;

const MapState: FC<Props> = ({ data, availableLayers, children }) => {
  const bounds = useMemo(() => {
    const fc = {
      type: "FeatureCollection",
      features: data,
    };
    const [e, s, w, n] = data ? bbox(fc) : bBoxGermany;
    const bounds = [w, s, e, n] as [number, number, number, number];
    return new LngLatBounds(bounds);
  }, [data]);

  const [viewState, setViewState] = useState<ViewState>({
    longitude: bounds.getCenter().lng,
    latitude: bounds.getCenter().lat,
    zoom: 10,
  } as ViewState);

  const [layers, setLayers] = useState<Layer[]>(availableLayers ?? []);

  return (
    <MapStateContext.Provider
      value={{
        data: data ?? [],
        viewState,
        setViewState,
        layers,
        setLayers,
      }}
    >
      <MapProvider>{children}</MapProvider>
    </MapStateContext.Provider>
  );
};

export default MapState;
