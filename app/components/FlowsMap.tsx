"use client";

import { Feature, FeatureCollection, LineString } from "geojson";
import dynamic from "next/dynamic";
import { FC } from "react";
import { GeoJSON } from "react-leaflet";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

type Props = {
  data: Feature<LineString>[];
};

const EventsMap: FC<Props> = ({ data }) => {
  const dataWithGeom = {
    type: "FeatureCollection",
    features: data.filter((d) => d.geometry),
  } as FeatureCollection;

  return (
    <Map data={dataWithGeom.features}>
      <GeoJSON
        data={dataWithGeom}
        style={(feature) => ({
          color: "red",
          weight: feature?.properties.value,
        })}
        onEachFeature={(feature, layer) => {
          const { birth_place, death_place, value } = feature.properties;
          layer.bindTooltip(
            `<div>
              <strong>${value}</strong>
              ${birth_place} ⤍ ${death_place}
            </div>`,
            { sticky: true, opacity: 1 }
          );
        }}
      />
    </Map>
  );
};

export default EventsMap;
