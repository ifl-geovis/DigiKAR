"use client";

import { bBoxGermany } from "@/lib/bBoxGermany";
import coordinatePairToBezierSpline from "@/lib/coordinatePairToBezierSpline";
import { HoverInfo } from "@/types/HoverInfo";
import bbox from "@turf/bbox";
import { scaleOrdinal, schemeCategory10 } from "d3";
import { Feature, FeatureCollection, LineString } from "geojson";
import { User2 } from "lucide-react";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useMemo, useState } from "react";
import Map, {
  Layer,
  MapLayerMouseEvent,
  NavigationControl,
  Source,
} from "react-map-gl/maplibre";

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
      //@ts-expect-error Map does not accept className prop
      className="h-full w-full"
      mapStyle={style}
      initialViewState={{
        bounds,
        fitBoundsOptions: {
          padding: { left: 20, top: 20, right: 20, bottom: 20 },
        },
      }}
      interactiveLayerIds={["bios"]}
      onMouseMove={handleMouseMove}
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
      {hoverInfo && (
        <div
          className={"absolute rounded-sm bg-white p-3 shadow-xl"}
          style={{ top: hoverInfo.y, left: hoverInfo.x }}
        >
          <div className="flex items-center gap-1">
            <User2 /> <strong> {hoverInfo.feature?.properties?.name}</strong>
          </div>
        </div>
      )}
    </Map>
  );
};

export default BiographiesMap;
