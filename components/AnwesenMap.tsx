"use client";

import { Feature, FeatureCollection, GeoJsonProperties, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useState } from "react";
import Map, {
  StyleSpecification,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  ViewStateChangeEvent,
  useMap,
} from "react-map-gl/maplibre";
import AnwesenMarker from "./AnwesenMarker";
import LayerMlBerlin from "./LayerMlBerlin";
import LayersControl from "./LayersControl";
import { useMapStateContext } from "./MapState/MapStateContext";
import ZoomIndicator from "./ZoomIndicator";

type Props = {
  data: FeatureCollection<Point, GeoJsonProperties>;
  mapStyle: StyleSpecification;
};

const AnwesenMap: FC<Props> = ({ data, mapStyle }) => {
  const { setViewState, viewState, setBounds, layers } = useMapStateContext();

  const [popupInfo, setPopupInfo] = useState<Feature<Point> | null>(null);

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
      mapStyle={mapStyle}
      minZoom={13.5}
      maxZoom={17}
    >
      <NavigationControl />
      <ScaleControl />
      <div className="absolute right-[50px] z-1 mt-[10px] flex items-center gap-2">
        <LayersControl />
        <ZoomIndicator />
      </div>
      {data.features.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates as [
          number,
          number,
        ];
        const gs = feature.properties?.Grundherrschaft;
        const ng = feature.properties?.Niedergericht;
        return (
          <Marker
            key={feature.properties?.uuid}
            longitude={longitude}
            latitude={latitude}
            onClick={() => {
              setPopupInfo(feature);
            }}
          >
            <AnwesenMarker gs={gs} ng={ng} size={24} />
          </Marker>
        );
      })}
      <LayerMlBerlin
        visibility={
          layers.find((d) => d.name === "Meilenblätter Berlin")?.visible
            ? "visible"
            : "none"
        }
      />
      {popupInfo && (
        <Popup
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          anchor="bottom"
          // onClose={() => setPopupInfo(null)}
        >
          <div>
            <h1>Hello world</h1>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default AnwesenMap;
