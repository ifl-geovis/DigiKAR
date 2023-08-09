"use client";

import { GeoJsonObject } from "geojson";
import { geoJson } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ComponentProps, FC, PropsWithChildren, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

type Props = PropsWithChildren<ComponentProps<typeof MapContainer>> & {
  data: GeoJsonObject[];
};

const Map: FC<Props> = ({ data, children, ...rest }) => {
  const bounds = useMemo(() => geoJson(data).getBounds(), [data]);

  return (
    <MapContainer
      className={"h-full !bg-white shadow-xl rounded"}
      bounds={bounds}
      doubleClickZoom={false}
      keyboard={false}
      {...rest}
    >
      {children}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
        opacity={0.1}
      />
    </MapContainer>
  );
};

export default Map;
