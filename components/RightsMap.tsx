"use client";

import bbox from "@turf/bbox";
import {
  FeatureCollection,
  GeoJsonProperties,
  MultiPolygon,
  Point,
} from "geojson";
import {
  LngLatBounds,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import Map, {
  Layer,
  MapRef,
  MapStyle,
  Marker,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl/maplibre";
import RightsMarker from "./RightsMarker";
import ZoomIndicator from "./ZoomIndicator";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import { mapToScale } from "@/lib/helpers";

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
  const mapRef = useRef<MapRef | null>(null);
  const [, setZoom] = useState(mapRef?.current?.getZoom());

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  const { data, order, colorScale, symbolMap } = useRightsExplorerContext();
  const symbolScale = mapToScale(symbolMap, "circle");

  const bounds = useMemo(() => {
    const fc: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: data,
    };
    const [e, s, w, n] = bbox(fc);
    const bounds = [w, s, e, n] as [number, number, number, number];
    return new LngLatBounds(bounds);
  }, [data]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        bounds: bounds,
        fitBoundsOptions: {
          padding: { left: 20, top: 20, right: 20, bottom: 20 },
        },
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle}
      interactiveLayerIds={["borders"]}
      onMouseMove={onHover}
      onMouseOut={() => setHoverInfo(undefined)}
      onZoomEnd={() => setZoom(mapRef.current?.getZoom())}
    >
      <NavigationControl />
      <ScaleControl />
      <ZoomIndicator />
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
      {borders && (
        <Source type="geojson" data={borders}>
          <Layer id="borders" type="fill" paint={{ "fill-opacity": 0 }} />
          <Layer
            id="borders-outline-blur"
            type="line"
            layout={{ "line-join": "round" }}
            paint={{
              "line-blur": 100,
              "line-color": "grey",
              "line-width": 20,
            }}
          />
          <Layer
            id="borders-outline"
            type="line"
            layout={{ "line-join": "round" }}
            paint={{ "line-color": "grey", "line-width": 1 }}
          />
        </Source>
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
