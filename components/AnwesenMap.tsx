"use client";

import { FeatureCollection, GeoJsonProperties, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback } from "react";
import Map, {
  MapStyle,
  Marker,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
  useMap,
} from "react-map-gl/maplibre";
import LayerMlBerlin from "./LayerMlBerlin";
import LayersControl from "./LayersControl";
import { useMapStateContext } from "./MapState/MapStateContext";
import ZoomIndicator from "./ZoomIndicator";

type Props = {
  data: FeatureCollection<Point, GeoJsonProperties>;
  mapStyle: MapStyle;
};

const AnwesenMap: FC<Props> = ({ data, mapStyle }) => {
  const { setViewState, viewState, setBounds, layers } = useMapStateContext();

  const handleMove = useCallback(
    (event: ViewStateChangeEvent) => {
      setViewState(event.viewState);
    },
    [setViewState],
  );

  const { anwesenMap } = useMap();

  const handleMoveEnd = useCallback(() => {
    const bounds = anwesenMap?.getBounds();
    if (bounds) setBounds(bounds);
  }, [anwesenMap, setBounds]);

  return (
    <Map
      onMove={handleMove}
      onMoveEnd={handleMoveEnd}
      initialViewState={viewState}
      id="anwesenMap"
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      minZoom={13.5}
    >
      <NavigationControl />
      <ScaleControl />
      <div className="z-1 absolute ml-[10px] mt-[10px] flex items-center gap-2">
        <LayersControl />
        <ZoomIndicator />
      </div>
      {data.features.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates as [
          number,
          number,
        ];
        return (
          <Marker
            key={feature.properties?.uuid}
            longitude={longitude}
            latitude={latitude}
          ></Marker>
        );
      })}
      {layers.find((d) => d.name === "Meilenblätter Berlin")?.visible && (
        <LayerMlBerlin />
      )}
    </Map>
  );
};

export default AnwesenMap;
