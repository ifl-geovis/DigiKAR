"use client";

import { HoverInfo } from "@/types/HoverInfo";
import bbox from "@turf/bbox";
import { Feature, FeatureCollection, Point } from "geojson";
import {
  LngLatBounds,
  MapLayerMouseEvent,
  StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useMemo, useState } from "react";
import Map, { Layer, NavigationControl, Source } from "react-map-gl/maplibre";

type Props = {
  data?: Feature<Point>[];
  isLoading: boolean;
  style: StyleSpecification;
};

const MatriculationsMap: FC<Props> = ({ style, data, isLoading }) => {
  const { places, bounds } = useMemo(() => {
    if (!data)
      return {
        places: {
          type: "FeatureCollection",
          features: [],
        } as FeatureCollection<Point>,
        bounds: new LngLatBounds([
          5.98865807458, 47.3024876979, 15.0169958839, 54.983104153,
        ]),
      };

    const places: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: data,
    };
    const [e, s, w, n] = bbox(places);
    const bounds = new LngLatBounds([w, s, e, n]);
    return { places, bounds };
  }, [data]);

  const [hoverInfo, setHoverInfo] = useState<HoverInfo | undefined>(undefined);
  const handleMouseMove = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];
    const info = { feature: hoveredFeature, x, y };
    setHoverInfo(hoveredFeature && info);
  }, []);

  return (
    <Map
      initialViewState={{
        bounds: bounds,
        fitBoundsOptions: {
          padding: { left: 20, top: 20, right: 20, bottom: 20 },
        },
      }}
      //@ts-expect-error Map does not accept className prop
      className={"h-full w-full"}
      interactiveLayerIds={["places"]}
      mapStyle={style}
      onMouseMove={handleMouseMove}
    >
      <NavigationControl />

      <Source type="geojson" data={places}>
        <Layer
          id="places"
          type="circle"
          paint={{
            "circle-color": "rgb(255,0,0)",
            "circle-radius": ["*", ["ln", ["get", "number"]], 8],
            "circle-opacity": [
              "case",
              ["==", isLoading, true],
              0.1,
              [
                "==",
                ["get", "place_name"],
                hoverInfo?.feature?.properties?.place_name ?? null,
              ],
              0.8,
              0.3,
            ],
          }}
        />
      </Source>

      {hoverInfo && (
        <div
          className={
            "pointer-events-none absolute rounded-sm bg-white p-3 shadow-xl"
          }
          style={{ top: hoverInfo.y, left: hoverInfo.x }}
        >
          <div className="flex items-baseline gap-1">
            <strong>{hoverInfo.feature?.properties?.number}</strong>
            {hoverInfo.feature?.properties?.place_name}
          </div>
        </div>
      )}
    </Map>
  );
};

export default MatriculationsMap;
