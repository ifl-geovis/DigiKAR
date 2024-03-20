"use client";

import { Skeleton } from "@/components/ui/skeleton";
import bbox from "@turf/bbox";
import { Feature, FeatureCollection, Point } from "geojson";
import {
  LngLatBounds,
  MapLayerMouseEvent,
  StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useMemo, useState } from "react";
import Map, { Layer, Source, NavigationControl } from "react-map-gl/maplibre";
import useSWRImmutable from "swr/immutable";
import fetcher from "../lib/fetcher";
import MapStage from "./MapStage";
import { extent } from "d3";
import { getMatriculations } from "@/lib/getMatriculations";

type Props = {
  style: StyleSpecification;
};

const MatriculationsMap: FC<Props> = ({ style }) => {
  type HoverInfo = { x: number; y: number; feature?: Feature };
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

  const { data, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getMatriculations>>
  >("/api/matriculations", fetcher);

  const { places, bounds, min, max } = useMemo(() => {
    if (!data) return { places: undefined, bounds: undefined };

    const [min, max] =
      extent(data, (d) => d.properties?.number as number) ?? [];

    const places: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: data,
    };
    const [e, s, w, n] = bbox(places);
    const bounds = new LngLatBounds([w, s, e, n]);
    return { places, bounds, min, max };
  }, [data]);

  return (
    <>
      <MapStage>
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : places ? (
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
                  "circle-opacity": [
                    "case",
                    [
                      "==",
                      ["get", "place_name"],
                      hoverInfo?.feature?.properties?.place_name ?? null,
                    ],
                    0.8,
                    0.3,
                  ],
                  "circle-color": "rgb(255,0,0)",
                  "circle-radius": [
                    "interpolate",
                    ["exponential", 0.96],
                    ["get", "number"],
                    min ?? 1,
                    1,
                    max ?? 1,
                    50,
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
                  <strong>{hoverInfo.feature?.properties?.number}</strong>
                  {hoverInfo.feature?.properties?.place_name}
                </div>
              </div>
            )}
          </Map>
        ) : (
          <div>no Data!</div>
        )}
      </MapStage>
    </>
  );
};

export default MatriculationsMap;
