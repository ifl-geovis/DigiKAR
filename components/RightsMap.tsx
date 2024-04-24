"use client";

import { mapToScale } from "@/lib/helpers";
import { FeatureCollection, GeoJsonProperties, MultiPolygon } from "geojson";
import { MapGeoJSONFeature, MapLayerMouseEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useState } from "react";
import Map, {
  MapStyle,
  Marker,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import RightsMarker from "./RightsMarker";
import ZoomIndicator from "./ZoomIndicator";
import BorderLayer from "./BorderLayer";
import LayersControl from "./LayersControl/LayersControl";
import { useMapStateContext } from "./MapState/MapStateContext";

type Props = {
  borders?: FeatureCollection<MultiPolygon, GeoJsonProperties>;
  mapStyle: MapStyle;
};

const RightsMap: FC<Props> = ({ borders, mapStyle }) => {
  const [hoverInfo, setHoverInfo] = useState<
    | {
        feature: MapGeoJSONFeature;
        x: number;
        y: number;
      }
    | undefined
  >(undefined);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  const { data, order, colorScale, symbolMap } = useRightsExplorerContext();
  const { viewState, setViewState, layers } = useMapStateContext();

  const handleMove = useCallback(
    (event: ViewStateChangeEvent) => {
      setViewState(event.viewState);
    },
    [setViewState],
  );

  const symbolScale = mapToScale(symbolMap, "circle");

  return (
    <Map
      id="rightsMap"
      initialViewState={viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      interactiveLayerIds={["borders"]}
      onMouseMove={onHover}
      onMouseOut={() => setHoverInfo(undefined)}
      onMove={handleMove}
    >
      <NavigationControl />
      <ScaleControl />
      <div className="z-1 absolute ml-[10px] mt-[10px] flex items-center gap-2">
        <LayersControl />
        <ZoomIndicator />
      </div>
      {data.map((d, idx) => {
        const radius = 20;
        const markerSize = radius * 2 + 3 * 6;
        return (
          <Marker
            key={idx}
            longitude={d.geometry.coordinates[0]}
            latitude={d.geometry.coordinates[1]}
          >
            <svg width={markerSize} height={markerSize}>
              <g transform={`translate(${markerSize / 2} ${markerSize / 2})`}>
                <RightsMarker
                  placeName={d.properties?.place}
                  placeAttributes={d.properties?.attributes}
                  radius={radius}
                  symbolScale={symbolScale}
                  colorScale={colorScale}
                  rightOrder={order}
                />
              </g>
            </svg>
          </Marker>
        );
      })}
      {layers.find((d) => d.name === "Borders")?.visible && borders && (
        <BorderLayer borders={borders} />
      )}
      {hoverInfo && (
        <div
          className="pointer-events-none absolute rounded-md bg-white p-2 shadow-lg"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>Amt: {hoverInfo.feature.properties?.amt}</div>
        </div>
      )}
    </Map>
  );
};

export default RightsMap;
