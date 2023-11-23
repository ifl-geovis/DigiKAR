"use client";

import { max, scaleSqrt } from "d3";
import { Feature, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useMemo } from "react";
import Map, {
  MapStyle,
  Marker,
  NavigationControl,
} from "react-map-gl/maplibre";
import BirthDeathSymbol from "./BirthDeathSymbol";

type Props = {
  data: Feature<Point>[];
  style: MapStyle;
};

const EventsMap: FC<Props> = ({ data, style }) => {
  const scaleR = useMemo(() => {
    const maxValue = max(data.map((d) => d.properties?.value));
    const scaleR = scaleSqrt().domain([0, maxValue]).range([0, 50]);
    return scaleR;
  }, [data]);
  return (
    <Map
      initialViewState={{
        longitude: 8.5,
        latitude: 49.9,
        zoom: 8,
      }}
      //@ts-expect-error Map does not accept className prop
      className={"w-full h-full"}
      mapStyle={style}
    >
      <NavigationControl />
      {data.map((d) => {
        const size = scaleR(d.properties?.value) * 2;
        return (
          <Marker
            key={d.id}
            longitude={d.geometry.coordinates[0]}
            latitude={d.geometry.coordinates[1]}
          >
            <BirthDeathSymbol size={size} scaleR={scaleR} feature={d} />
          </Marker>
        );
      })}
    </Map>
  );
};

export default EventsMap;
