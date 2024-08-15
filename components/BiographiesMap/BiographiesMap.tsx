"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";
import { Feature, FeatureCollection, LineString } from "geojson";
import { FC, useMemo } from "react";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import Map, { NavigationControl, Source, Layer } from "react-map-gl/maplibre";
import coordinatePairToBezierSpline from "@/lib/coordinatePairToBezierSpline";
import { bBoxGermany } from "@/lib/bBoxGermany";
import { scaleOrdinal, schemeCategory10 } from "d3";

type Props = {
  data: Feature<LineString>[];
  style: StyleSpecification;
};

const BiographiesMap: FC<Props> = ({ data, style }) => {
  const { lines, bounds } = useMemo(() => {
    const colorDomain = data.map((d) => d.properties?.name);
    const colorScale = scaleOrdinal(schemeCategory10).domain(colorDomain);
    const features = data.map((d, idx) => {
      const coordinates = d.geometry.coordinates
        // get all but the last coordinate for multistring, get the first two for single string
        .slice(0, -1)
        .flatMap((a, i) =>
          coordinatePairToBezierSpline([a, d.geometry.coordinates[i + 1]]).map(
            (d) => [...d, 100],
          ),
        );
      return {
        ...d,
        properties: {
          ...d.properties,
          color: colorScale(d.properties?.name),
        },
        id: idx,
        geometry: {
          type: d.geometry.type,
          coordinates,
        },
      };
    });
    const fc: FeatureCollection = {
      type: "FeatureCollection",
      features,
    };
    const [e, s, w, n] = fc.features.length > 0 ? bbox(fc) : bBoxGermany;
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
            "line-color": ["get", "color"],
          }}
        />
      </Source>
    </Map>
  );
};

export default BiographiesMap;
