"use client";

import Map, {
  MapStyle,
  Marker,
  NavigationControl,
} from "react-map-gl/maplibre";
import { LngLatBounds } from "maplibre-gl";
import { Feature, GeoJsonProperties, Point } from "geojson";
import { FC, useMemo, useState } from "react";
import Snowflake from "./Snowflake";
import colorScaleAnsbach from "../lib/colorScaleAnsbach";
import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";
import { FeatureCollection } from "@turf/helpers";

type Props = {
  data: Feature<Point, GeoJsonProperties>[];
  style: MapStyle;
};

const RightsMap: FC<Props> = ({ data, style }) => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );

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
      mapStyle={style}
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
                <Snowflake
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
    </Map>
  );
};

export default RightsMap;
