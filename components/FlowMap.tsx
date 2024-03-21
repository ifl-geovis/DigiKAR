"use client";

import { Feature, FeatureCollection, LineString } from "geojson";
import { FC, useCallback, useMemo, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
  NavigationControl,
  Source,
  MapLayerMouseEvent,
} from "react-map-gl/maplibre";
import Layer from "react-map-gl/dist/esm/components/layer";
import { extent } from "d3";
import length from "@turf/length";
import midpoint from "@turf/midpoint";
import bearing from "@turf/bearing";
import destination from "@turf/destination";
import bezierSpline from "@turf/bezier-spline";
import bbox from "@turf/bbox";
import { lineString } from "@turf/helpers";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import { HoverInfo } from "@/types/HoverInfo";

type Props = {
  data: Feature<LineString>[];
  style: StyleSpecification;
};

const FlowMap: FC<Props> = ({ data, style }) => {
  const { flows, min, max, bounds } = useMemo(() => {
    const flows: FeatureCollection = {
      type: "FeatureCollection",
      features: data
        .filter((d) => d.geometry)
        .map((d, idx) => {
          const [start, end] = d.geometry.coordinates;
          const distance = length(d, { units: "kilometers" });
          const m = midpoint(start, end);
          const b = bearing(start, end);
          const cp = destination(m, distance / 6, b + 90, {
            units: "kilometers",
          });

          const coordinates = bezierSpline(
            lineString([start, cp.geometry.coordinates, end]),
          ).geometry.coordinates;

          return {
            ...d,
            id: idx,
            geometry: {
              type: d.geometry.type,
              coordinates,
            },
          };
        }),
    };
    const [min, max] = extent(data.map((d) => d.properties?.value));
    const [e, s, w, n] = bbox(flows);
    const bounds = new LngLatBounds([w, s, e, n]);
    return { flows, min, max, bounds };
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
        bounds,
        fitBoundsOptions: {
          padding: { left: 20, top: 20, right: 20, bottom: 20 },
        },
      }}
      //@ts-expect-error Map does not accept className prop
      className={"h-full w-full"}
      interactiveLayerIds={["flows"]}
      mapStyle={style}
      onMouseMove={handleMouseMove}
    >
      <NavigationControl />
      <Source id="flow-data" data={flows} type={"geojson"} lineMetrics>
        <Layer
          id="flows"
          type="line"
          paint={{
            "line-width": [
              "interpolate",
              ["linear"],
              ["get", "value"],
              min,
              2,
              max,
              100,
            ],
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              0,
              "rgb(255,175,175)",
              1,
              "rgb(185,0,30)",
            ],
          }}
        />
      </Source>

      {hoverInfo && (
        <div
          id="mytooltip"
          // Question: Why does it not work via tailwind classes
          className={"absolute rounded-sm bg-white p-3 shadow-xl"}
          style={{ top: hoverInfo.y, left: hoverInfo.x }}
        >
          <div className="flex items-baseline gap-1">
            <strong>{hoverInfo.feature?.properties?.value}</strong>
            {hoverInfo.feature?.properties?.birth_place} <ArrowRightIcon />
            {hoverInfo.feature?.properties?.death_place}
          </div>
        </div>
      )}
    </Map>
  );
};

export default FlowMap;
