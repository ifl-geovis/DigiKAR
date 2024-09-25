"use client";

import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapViewLayout from "@/components/MapViewLayout";
import WheelOfInstitutions from "@/components/WheelOfInstitutions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import fetcher from "@/lib/fetcher";
import { getFunctionalitiesPerPlace } from "@/lib/getFunctionalitiesPerPlace";
import bbox from "@turf/bbox";
import { rollup } from "d3";
import { Feature, FeatureCollection, Point } from "geojson";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useMemo, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import useSWRImmutable from "swr/immutable";
import MapTitle from "./MapTitle";

type Props = {
  style: StyleSpecification;
};

const PlaceFunctionalitiesMap: FC<Props> = ({ style }) => {
  const [lens, setLens] = useState<string>("RKG");
  const [filter, setFilter] = useState<string | undefined>(undefined);

  // TODO: fix workaround with unused URL base
  const url = new URL("/api/functionalities", "http://example.org");
  const searchParams = url.searchParams;
  lens ? searchParams.set("lens", lens) : searchParams.delete("lens");
  filter ? searchParams.set("filter", filter) : searchParams.delete("filter");

  const { data, isLoading, error } = useSWRImmutable<
    Awaited<ReturnType<typeof getFunctionalitiesPerPlace>>
  >(`${url.pathname}?${url.searchParams}`, fetcher);

  const { places, bounds } = useMemo(() => {
    if (!data || error) return { places: undefined, bounds: undefined };
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
        }) as Feature<Point>,
      (d) => d.properties.place,
    );
    const places: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: Array.from(groupedByPlace.values()),
    };
    const [e, s, w, n] = bbox(places);
    const bounds = new LngLatBounds([w, s, e, n]);
    return { places, bounds };
  }, [data, error]);

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Kurmainz</MapTitle>
          <p>Funktionen von Personen je Institution</p>
        </Card>
        <Card>
          <div className="flex gap-3">
            <div className="grid max-w-sm items-center gap-1.5">
              <Label>Sonde</Label>
              <Select
                defaultValue={lens}
                onValueChange={(value) => setLens(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Wähle eine Sonde" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Datensonde</SelectLabel>
                    <SelectItem value="state_calendar_erfurt">
                      Erfurt
                    </SelectItem>
                    <SelectItem value="university_mainz">Mainz</SelectItem>
                    <SelectItem value="RKG">Reichskammergericht</SelectItem>
                    <SelectItem value="students">Studierende</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="functionality">Filter</Label>
              <Input
                type="text"
                id="functionality"
                placeholder="Funktion"
                onBlur={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </MapAside>
      <MapContainer>
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : places ? (
          <Map
            initialViewState={{
              bounds: bounds,
              fitBoundsOptions: {
                padding: { left: 20, top: 20, right: 20, bottom: 20 },
              },
            }}
            //@ts-expect-error Map does not accept className prop
            className={"h-full w-full"}
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
      </MapContainer>
    </MapViewLayout>
  );
};

export default PlaceFunctionalitiesMap;
