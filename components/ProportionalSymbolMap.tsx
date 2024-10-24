"use client";

import { bBoxGermany } from "@/lib/bBoxGermany";
import { HoverInfo } from "@/types/HoverInfo";
import bbox from "@turf/bbox";
import { Feature, FeatureCollection, Point } from "geojson";
import { LuUser2 } from "react-icons/lu";
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

const ProportionalSymbolMap: FC<Props> = ({ style, data, isLoading }) => {
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
    const [e, s, w, n] =
      places.features.length > 0 ? bbox(places) : bBoxGermany;
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

  const individuals =
    hoverInfo && JSON.parse(hoverInfo.feature?.properties?.individuals);

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
            "circle-radius": ["*", ["+", 1, ["ln", ["get", "number"]]], 8],
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
          <div className="flex items-center">
            <strong>{hoverInfo.feature?.properties?.place_name}</strong>
            <div className="ml-auto flex items-center gap-1">
              <LuUser2 size={16} />
              <span className="rounded-full bg-gray-50 px-3 py-1">
                {hoverInfo.feature?.properties?.number}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <ol>
              {/*
              TODO: improve workaround
              the returned feature from active layers seem to be stringified
              see https://github.com/maplibre/maplibre-gl-js/issues/1325
              */}

              {individuals.slice(0, 10).map((d: string) => (
                <li key={d}>{d}</li>
              ))}
              {individuals.length > 10 && (
                <li className="mt-2 inline-block rounded-full bg-gray-500 px-3 py-1 italic text-white">
                  + {individuals.length - 10} weitere
                </li>
              )}
            </ol>
          </div>
        </div>
      )}
    </Map>
  );
};

export default ProportionalSymbolMap;
