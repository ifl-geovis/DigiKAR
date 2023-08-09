"use client";

import { FeatureCollection, GeoJsonProperties, Point } from "geojson";
import dynamic from "next/dynamic";
import { FC, useState } from "react";
import { Marker, MarkerLayer } from "react-leaflet-marker";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

type Props = {
  data: FeatureCollection<Point, GeoJsonProperties>;
};

const RightsMap: FC<Props> = ({ data }) => {
  const [symbol, setSymbol] = useState(null);
  return (
    <>
      {symbol}
      <DynamicMap data={data.features}>
        <MarkerLayer>
          {data.features.map((d) => {
            const size = 4;
            return (
              <div className="absolute" key={d.properties?.id}>
                <Marker
                  position={
                    [...d.geometry.coordinates].reverse() as [number, number]
                  }
                  size={[size, size]}
                  placement="center"
                  interactive
                  riseOnHover
                  zIndexOffset={100}
                >
                  <svg width={size} height={size}>
                    <circle cx={size / 2} cy={size / 2} r={size / 2} />
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
