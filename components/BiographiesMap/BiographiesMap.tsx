"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";
import { Feature, FeatureCollection, LineString } from "geojson";
import { FC, useMemo } from "react";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import Map, { NavigationControl, Source, Layer } from "react-map-gl/maplibre";

type Props = {
  data: Feature<LineString>[];
  style: StyleSpecification;
};

const BiographiesMap: FC<Props> = ({ data, style }) => {
  const { lines, bounds } = useMemo(() => {
    const fc: FeatureCollection = {
      type: "FeatureCollection",
      features: data,
    };
    const [e, s, w, n] = bbox(fc);
    const bounds = new LngLatBounds([w, s, e, n]);
    return { lines: fc, bounds };
  }, [data]);

  return (
    <Map
      //@ts-expect-error Map does not accept className prop
      className="h-full w-full"
      mapStyle={style}
      initialViewState={{
        bounds,
        fitBoundsOptions: {
          padding: { left: 20, top: 20, right: 20, bottom: 20 },
        },
      }}
    >
      <NavigationControl />
      <Source id="flow-data" data={lines} type={"geojson"} lineMetrics>
        <Layer
          id="bios"
          type="line"
          paint={{
            "line-width": 1,
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
    </Map>
  );
};

export default BiographiesMap;
