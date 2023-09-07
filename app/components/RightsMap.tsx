"use client";

import { FeatureCollection, GeoJsonProperties, Point } from "geojson";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { Marker, MarkerLayer } from "react-leaflet-marker";
import Snowflake from "./Snowflake";
import colorScaleAnsbach from "../lib/colorScaleAnsbach";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

type Props = {
  data: FeatureCollection<Point, GeoJsonProperties>;
};

const RightsMap: FC<Props> = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );
  return (
    <>
      <DynamicMap data={data.features}>
        <MarkerLayer>
          {data.features.map((d) => {
            const radius = 20;
            const margin = 2;
            const markerSize = radius * 4 + margin;
            return (
              <div className="absolute" key={d.properties?.id}>
                <Marker
                  position={
                    [...d.geometry.coordinates].reverse() as [number, number]
                  }
                  size={[markerSize, markerSize]}
                  placement="center"
                  interactive
                  riseOnHover
                  zIndexOffset={100}
                >
                  <svg width={markerSize} height={markerSize}>
                    <g
                      transform={`translate(${markerSize / 2} ${
                        markerSize / 2
                      })`}
                    >
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
              </div>
            );
          })}
        </MarkerLayer>
      </DynamicMap>
    </>
  );
};

export default RightsMap;
