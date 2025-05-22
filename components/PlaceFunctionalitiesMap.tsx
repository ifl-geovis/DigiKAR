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
import fetcher from "@/lib/fetcher";
import { getFunctionalitiesPerPlace } from "@/lib/get-functionalities-per-place";
import bbox from "@turf/bbox";
import { rollup } from "d3";
import { Feature, FeatureCollection, Point } from "geojson";
import { LngLatBounds, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useMemo, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import useSWRImmutable from "swr/immutable";
import MapTitle from "./MapTitle";
import { bBoxGermany } from "@/lib/bbox-germany";
import MapControl from "./MapControl";
import Spinner from "./Spinner";

type Props = {
  style: StyleSpecification;
};

const PlaceFunctionalitiesMap: FC<Props> = ({ style }) => {
  const [lens, setLens] = useState<string>("Reichskammergericht");
  const [filter, setFilter] = useState<string | undefined>(undefined);

  // TODO: fix workaround with unused URL base
  const url = new URL("/api/functionalities", "http://example.org");
  const searchParams = url.searchParams;
  if (lens) searchParams.set("lens", lens);
  if (!lens) searchParams.delete("lens");
  if (filter) searchParams.set("filter", filter);
  if (!filter) searchParams.delete("filter");

  const { data, isLoading, error } = useSWRImmutable<
    Awaited<ReturnType<typeof getFunctionalitiesPerPlace>>
  >(`${url.pathname}?${url.searchParams}`, fetcher);

  const { places, bounds } = useMemo(() => {
    if (!data || data.length === 0 || error)
      return { places: undefined, bounds: new LngLatBounds(bBoxGermany) };
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
    const [w, s, e, n] = bbox(places);
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
          <div className="flex flex-col gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
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
                    <SelectItem value="Staatskalender Erfurt">
                      Staatskalender Erfurt
                    </SelectItem>
                    <SelectItem value="Universität Mainz Studierende">
                      Universität Mainz Studierende
                    </SelectItem>
                    <SelectItem value="Reichskammergericht">
                      Reichskammergericht
                    </SelectItem>
                    {/* lens Domkapitulare Mainz does not have person_function */}
                    <SelectItem disabled value="Domkapitulare Mainz">
                      Domkapitulare Mainz
                    </SelectItem>
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
        <Map
          //@ts-expect-error Map does not accept className prop
          className={"h-full w-full"}
          initialViewState={{
            bounds: bounds,
            fitBoundsOptions: {
              padding: { left: 20, top: 20, right: 20, bottom: 20 },
            },
          }}
          minZoom={4}
          interactiveLayerIds={["flows"]}
          mapStyle={style}
        >
          <div className="absolute right-[50px] z-1 mt-[10px] flex items-center gap-2">
            {isLoading && (
              <MapControl>
                <MapControl>
                  <div className="px-3">
                    <Spinner />
                  </div>
                </MapControl>
              </MapControl>
            )}
          </div>
          <NavigationControl />
          {places &&
            places.features.map((d) => (
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
      </MapContainer>
    </MapViewLayout>
  );
};

export default PlaceFunctionalitiesMap;
