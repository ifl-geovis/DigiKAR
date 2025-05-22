"use client";

import { max, scaleOrdinal, scaleSqrt } from "d3";
import { schemeObservable10 } from "d3-scale-chromatic";
import { Feature, Point } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useMemo } from "react";

import { LifeEvent } from "@/lib/get-place-origin-death";
import Map, {
  StyleSpecification,
  Marker,
  NavigationControl,
} from "react-map-gl/maplibre";
import BirthDeathSymbol from "./BirthDeathSymbol";

type Props = {
  data: Feature<Point, { events: LifeEvent[]; place: string }>[];
  style: StyleSpecification;
  eventDomain: string[];
};

const EventsMap: FC<Props> = ({ data, style, eventDomain }) => {
  const scaleR = useMemo(() => {
    const maxValue = max(
      data.flatMap((d) => d.properties?.events.flatMap((d) => d.count)),
    );
    const scaleR = scaleSqrt()
      .domain([0, maxValue ?? 1])
      .range([0, 100]);
    return scaleR;
  }, [data]);
  const colorScale = useMemo(
    () =>
      scaleOrdinal<string, string>()
        .domain(eventDomain)
        .range(schemeObservable10)
        .unknown("gray"),
    [eventDomain],
  );

  return (
    <Map
      //@ts-expect-error Map does not accept className prop
      className={"h-full w-full"}
      minZoom={4}
      initialViewState={{
        longitude: 8.5,
        latitude: 49.9,
        zoom: 8,
      }}
      mapStyle={style}
    >
      <NavigationControl />
      {data
        .filter((d) => d.properties.events.length > 1)
        .map((d) => {
          const maxCount = max(d.properties.events.map((d) => d.count));
          const size = scaleR(maxCount ?? 0) * 2;
          return (
            <Marker
              key={d.id}
              longitude={d.geometry.coordinates[0]}
              latitude={d.geometry.coordinates[1]}
            >
              <BirthDeathSymbol
                colorScale={colorScale}
                size={size}
                scaleR={scaleR}
                feature={d}
              />
            </Marker>
          );
        })}
    </Map>
  );
};

export default EventsMap;
