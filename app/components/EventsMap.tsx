"use client";

import { max, scaleSqrt } from "d3";
import { Feature, Point } from "geojson";
import dynamic from "next/dynamic";
import { FC, useMemo } from "react";
import BirthDeathSymbol from "./BirthDeathSymbol";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const MarkerLayer = dynamic(
  () => import("react-leaflet-marker").then((module) => module.MarkerLayer),
  {
    ssr: false,
  }
);

const Marker = dynamic(
  () => import("react-leaflet-marker").then((module) => module.Marker),
  {
    ssr: false,
  }
);

type Props = {
  data: Feature<Point>[];
};

const EventsMap: FC<Props> = ({ data }) => {
  const scaleR = useMemo(() => {
    const maxValue = max(data.map((d) => d.properties?.value));
    const scaleR = scaleSqrt().domain([0, maxValue]).range([0, 50]);
    return scaleR;
  }, [data]);
  return (
    <DynamicMap data={data}>
      <MarkerLayer>
        {data.map((d) => {
          const size = scaleR(d.properties?.value) * 2;
          return (
            <div className="absolute" key={d.id}>
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
                <BirthDeathSymbol size={size} scaleR={scaleR} feature={d} />
              </Marker>
            </div>
          );
        })}
      </MarkerLayer>
    </DynamicMap>
  );
};

export default EventsMap;
