"use client";

import { Point, Feature, FeatureCollection } from "geojson";
import { FC, useMemo } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { NavigationControl, Marker } from "react-map-gl/maplibre";
import { rollup } from "d3";
import bbox from "@turf/bbox";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import { getFunctionalitiesPerPlace } from "../lib/getFunctionalitiesPerPlace";
import WheelOfInstitutions from "./WheelOfInstitutions";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

type Props = {
  data: Awaited<ReturnType<typeof getFunctionalitiesPerPlace>>;
  style: StyleSpecification;
};

const PlaceFunctionalitiesMap: FC<Props> = ({ data: staticData, style }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/functionalities`;
  const { data, isLoading, error } = useSWR<{
    functionalities: typeof staticData;
  }>(url, fetcher);
  // console.log({ url, data, isLoading });
  const { places, bounds } = useMemo(() => {
    const groupedByPlace = rollup(
      data?.functionalities ?? staticData,
      (D) =>
        ({
          type: "Feature",
          id: D[0].id,
          geometry: D[0].geometry,
          properties: {
            place: D[0].properties.place,
            institutions: D,
          },
        } as Feature<Point>),
      (d) => d.properties.place
    );
    const places: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: Array.from(groupedByPlace.values()),
    };
    const [e, s, w, n] = bbox(places);
    const bounds = new LngLatBounds([w, s, e, n]);
    return { places, bounds };
  }, [staticData, data?.functionalities]);

  return (
    <Map
      initialViewState={{
        bounds,
        fitBoundsOptions: {
          padding: { left: 20, top: 20, right: 20, bottom: 20 },
        },
      }}
      //@ts-expect-error
      className={"w-full h-full"}
      interactiveLayerIds={["flows"]}
      mapStyle={style}
    >
      <NavigationControl />
      {places.features.map((d) => (
        <Marker
          key={d.id}
          longitude={d.geometry.coordinates[0]}
          latitude={d.geometry.coordinates[1]}
        >
          <WheelOfInstitutions institutions={d.properties?.institutions} />
        </Marker>
      ))}
    </Map>
  );
};

export default PlaceFunctionalitiesMap;
