"use client";

import { Point, Feature, FeatureCollection } from "geojson";
import { FC, useMemo, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { NavigationControl, Marker } from "react-map-gl/maplibre";
import { rollup } from "d3";
import bbox from "@turf/bbox";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import { getFunctionalitiesPerPlace } from "../lib/getFunctionalitiesPerPlace";
import WheelOfInstitutions from "./WheelOfInstitutions";
import useSWRImmutable from "swr/immutable";
import fetcher from "../lib/fetcher";
import MapStage from "./MapStage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  style: StyleSpecification;
};

const PlaceFunctionalitiesMap: FC<Props> = ({ style }) => {
  const [table, setTable] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  // TODO: fix workaround with unused URL base
  const url = new URL("/api/functionalities", "http://example.org");
  const searchParams = url.searchParams;
  table ? searchParams.set("table", table) : searchParams.delete("table");
  filter ? searchParams.set("filter", filter) : searchParams.delete("filter");

  const { data, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getFunctionalitiesPerPlace>>
  >(`${url.pathname}?${url.searchParams}`, fetcher);

  const { places, bounds } = useMemo(() => {
    if (!data) return { places: undefined, bounds: undefined };
    const groupedByPlace = rollup(
      data,
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
  }, [data]);

  return (
    <>
      <div className="flex gap-3">
        <div className="grid max-w-sm items-center gap-1.5 my-4">
          <Label>Sonde</Label>
          <Select
            defaultValue="state_calendar_aschaffenburg"
            onValueChange={(value) => setTable(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wähle eine Sonde" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Datensonde</SelectLabel>
                <SelectItem value="state_calendar_aschaffenburg">
                  Aschaffenburg
                </SelectItem>
                <SelectItem value="university_mainz">Mainz</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label htmlFor="email">Filter</Label>
          <Input
            type="text"
            id="filder"
            placeholder="Functionality"
            onBlur={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <MapStage>
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : places ? (
          <Map
            initialViewState={{
              bounds: bounds,
              fitBoundsOptions: {
                padding: { left: 20, top: 20, right: 20, bottom: 20 },
              },
            }}
            //@ts-expect-error Map does not accept className prop
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
                <WheelOfInstitutions
                  institutions={d.properties?.institutions}
                />
              </Marker>
            ))}
          </Map>
        ) : (
          <div>no Data!</div>
        )}
      </MapStage>
    </>
  );
};

export default PlaceFunctionalitiesMap;
