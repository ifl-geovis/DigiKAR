"use client";

import colorMapKursachsen from "@/lib/colorMapKursachsen";
import { mapToScale } from "@/lib/helpers";
import { Feature, FeatureCollection, GeoJsonProperties, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useState } from "react";
import Map, {
  MapStyle,
  Marker,
  NavigationControl,
  Popup,
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

  const [popupInfo, setPopupInfo] = useState<Feature<Point> | null>(null);

  const colorScale = mapToScale(colorMapKursachsen, "lightgrey");

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
      maxZoom={17}
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
        const markerSize = 29;
        const radius = markerSize / 2 - 2;
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
            <svg width={markerSize} height={markerSize}>
              <g transform="translate(1 1)">
                <path
                  d={`M${radius},0 A${radius},${radius} 0 0 1 ${radius},${2 * radius} Z`}
                  fill={gs.isDisputed ? "white" : colorScale(gs.category)}
                  stroke="currentColor"
                />
                {gs.isDisputed && (
                  <path
                    d={`M${radius},${radius * 0.75} A${radius / 4},${radius / 4} 0 0 1 ${radius},${1.25 * radius} Z`}
                  />
                )}
                <path
                  d={`M${radius},0 A${radius},${radius} 0 0 0 ${radius},${2 * radius} Z`}
                  fill={gs.isDisputed ? "white" : colorScale(ng?.category)}
                  stroke="currentColor"
                />
                {gs.isDisputed && (
                  <path
                    d={`M${radius},${radius * 1.25} A${radius / 4},${radius / 4} 0 0 1 ${radius},${0.75 * radius} Z`}
                  />
                )}
              </g>
            </svg>
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
