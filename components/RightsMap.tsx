"use client";

import Map, {
  Layer,
  MapStyle,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl/maplibre";
import {
  LngLatBounds,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  MapMouseEvent,
} from "maplibre-gl";
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  MultiPolygon,
  Point,
} from "geojson";
import { FC, memo, useCallback, useMemo, useState } from "react";
import Snowflake from "./Snowflake";
import colorScaleAnsbach from "../lib/colorScaleAnsbach";
import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";

type Props = {
  data: Feature<Point, GeoJsonProperties>[];
  borders?: FeatureCollection<MultiPolygon, GeoJsonProperties>;
  mapStyle: MapStyle;
};

const RightsMap: FC<Props> = ({ data, borders, mapStyle }) => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );
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
    >
      <NavigationControl />
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
                <SnowflakeMemoized
                  placeName={d.properties?.place}
                  placeAttributes={d.properties?.attributes}
                  radius={radius}
                  activeCategory={activeCategory}
                  handleCategoryClick={setActiveCategory}
                  colorScale={colorScaleAnsbach}
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
          className="bg-white absolute p-2 shadow-lg rounded-md pointer-events-none"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>Amt: {hoverInfo.feature.properties?.amt}</div>
        </div>
      )}
    </Map>
  );
};

export default RightsMap;

const SnowflakeMemoized = memo(Snowflake);
