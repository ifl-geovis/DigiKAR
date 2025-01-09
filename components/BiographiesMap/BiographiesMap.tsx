"use client";

import { bBoxGermany } from "@/lib/bBoxGermany";
import coordinatePairToBezierSpline from "@/lib/coordinatePairToBezierSpline";
import { HoverInfo } from "@/types/HoverInfo";
import { RowSelectionState } from "@tanstack/react-table";
import bbox from "@turf/bbox";
import { featureCollection } from "@turf/helpers";
import { Feature, LineString } from "geojson";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import Map, {
  Layer,
  MapLayerMouseEvent,
  MapRef,
  NavigationControl,
  ScaleControl,
  Source,
} from "react-map-gl/maplibre";

type Props = {
  data?: Feature<LineString>[];
  style: StyleSpecification;
  selected: RowSelectionState;
};

const BiographiesMap: FC<Props> = ({ data, style, selected }) => {
  const mapRef = useRef<MapRef>(null);

  const filteredData = useMemo(() => {
    if (!data) return;
    return data.filter((d) => {
      const selectedIds = Object.keys(selected).map((d) => parseInt(d));
      const id = d.properties?.personId;
      return selectedIds.includes(id);
    });
  }, [selected, data]);

  const { lines, bounds } = useMemo(() => {
    if (!filteredData || filteredData.length === 0)
      return { lines: undefined, bounds: new LngLatBounds(bBoxGermany) };
    const features = filteredData.map((d, idx) => {
      const coordinates = d.geometry.coordinates
        // get all but the last coordinate for multistring, get the first two for single string
        .slice(0, -1)
        .flatMap((a, i) =>
          coordinatePairToBezierSpline([a, d.geometry.coordinates[i + 1]]).map(
            (d) => [...d],
          ),
        );
      return {
        ...d,
        id: idx,
        geometry: {
          type: d.geometry.type,
          coordinates,
        },
      };
    });
    const fc = featureCollection(features);
    const [w, s, e, n] = bbox(fc);
    const bounds = new LngLatBounds([w, s, e, n]);
    return { lines: fc, bounds };
  }, [filteredData]);

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

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds, {
        padding: 40,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }, [bounds]);

  return (
    <Map
      //@ts-expect-error Map does not accept className prop
      className="h-full w-full"
      mapStyle={style}
      interactiveLayerIds={["bios"]}
      minZoom={4}
      onMouseMove={handleMouseMove}
      ref={mapRef}
    >
      <ScaleControl />
      <NavigationControl />
      {lines && (
        <Source
          key={data?.length}
          id="flow-data"
          data={lines}
          type={"geojson"}
          lineMetrics
        >
          <Layer
            id="bios"
            type="line"
            paint={{
              "line-color": ["get", "color"],
              "line-width": [
                "interpolate",
                ["linear"],
                ["-", 1, ["get", "progress"]],
                0,
                1,
                1,
                3,
              ],
              "line-opacity": ["-", 1.25, ["get", "progress"]],
            }}
          />
        </Source>
      )}
      {hoverInfo && <Tooltip hoverInfo={hoverInfo} />}
    </Map>
  );
};

const Tooltip = ({ hoverInfo }: { hoverInfo: HoverInfo }) => {
  const { feature, x, y } = hoverInfo;
  const properties = feature?.properties;
  if (!properties) return null;
  const { name, personId, eventIdx, totalEvents } = properties;
  return (
    <div
      className={"absolute rounded-sm bg-white p-3 shadow-xl"}
      style={{ top: y, left: x }}
    >
      <div className="flex items-center gap-1">
        <LuUser2 /> <strong> {name}</strong>
        <code>{personId}</code>
      </div>
      <div className="flex items-center gap-1">
        <span>Events</span>
        <code>
          #{eventIdx}, #{eventIdx + 1} (von {totalEvents})
        </code>
      </div>
    </div>
  );
};

export default BiographiesMap;
