"use client";

import { max, scaleSqrt } from "d3";
import { Feature, GeoJsonProperties, Point } from "geojson";
import dynamic from "next/dynamic";
import { FC, useMemo, useState } from "react";
import { Marker, MarkerLayer } from "react-leaflet-marker";
import BirthDeathSymbol from "./BirthDeathSymbol";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

type Props = {
  data: GeoJsonProperties[];
};

const EventsMap: FC<Props> = ({ data }) => {
  const [symbol, setSymbol] = useState(null);
  const { features, scaleR } = useMemo(() => {
    const features: Feature<Point>[] = data.map((d: any, i) => ({
      type: "Feature",
      properties: {
        id: i,
        ...d,
      },
      geometry: {
        type: "Point",
        coordinates: [d.geonamesLng, d.geonamesLat] as [number, number],
      },
    }));
    const maxValue = max(data.map((d: any) => [d.Geburt, d.Tod]).flat());
    const scaleR = scaleSqrt().domain([0, maxValue]).range([0, 50]);
    return { features, scaleR };
  }, [data]);
  return (
    <>
      {symbol}
      <DynamicMap data={features}>
        <MarkerLayer>
          {features.map((d) => {
            const maxR =
              max([scaleR(d.properties?.Geburt), scaleR(d.properties?.Tod)]) ??
              10;
            const size = maxR * 2;
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
                  <BirthDeathSymbol size={size} scaleR={scaleR} feature={d} />
                </Marker>
              </div>
            );
          })}
        </MarkerLayer>
      </DynamicMap>
    </>
  );
};

export default EventsMap;
