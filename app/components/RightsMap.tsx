"use client";

import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import { FeatureCollection, GeoJsonProperties, Point } from "geojson";
import { FC, useState } from "react";
import Snowflake from "./Snowflake";
import colorScaleAnsbach from "../lib/colorScaleAnsbach";
import "maplibre-gl/dist/maplibre-gl.css";
import useCustomBasemapStyle from "../hooks/useCustomBasemapStyle";

type Props = {
  data: FeatureCollection<Point, GeoJsonProperties>;
};

const RightsMap: FC<Props> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );

  const { style, isLoading } = useCustomBasemapStyle();

  return (
    <Map
      initialViewState={{
        longitude: 10.5,
        latitude: 49.3,
        zoom: 12,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={style}
    >
      <NavigationControl />
      {data.features.map((d, idx) => {
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
