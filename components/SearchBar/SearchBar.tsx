"use client";

import fetcher from "@/lib/fetcher";
import { Point } from "geojson";
import { LngLat } from "maplibre-gl";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import useSWRImmutable from "swr/immutable";
import { AutoComplete } from "../autocomplete";
import { RxExclamationTriangle } from "react-icons/rx";

type Place = {
  id: string;
  geometry: Point;
  label: string;
  case_study: string;
};

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { rightsMap } = useMap();
  const { data, isLoading, error } = useSWRImmutable<Place[]>(
    `https://api.geohistoricaldata.org/digikar/orte?geometry=not.is.null&in_sample_regions=is.true&order=label.asc&label=ilike.*${searchValue}*`,
    fetcher,
  );
  useEffect(() => {
    if (!selectedValue || !data) return;
    const coordinates = data.find((d) => d.id == selectedValue)?.geometry
      .coordinates;
    const center = coordinates
      ? new LngLat(coordinates[0], coordinates[1])
      : undefined;
    if (rightsMap && center) {
      rightsMap.flyTo({
        center,
        zoom: 14,
        speed: 3,
      });
    }
  }, [selectedValue, data, rightsMap]);

  if (error) {
    return (
      <div className="bg-background rounded-md border p-3 text-sm text-red-500 shadow">
        <RxExclamationTriangle className="mr-2 inline" />
        Fehler beim Laden der Orte: {error.message}
      </div>
    );
  }
  const items =
    data?.map((d) => ({
      value: d.id,
      label: d.label,
    })) ?? [];

  return (
    <AutoComplete
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      items={items ?? []}
      isLoading={isLoading}
      emptyMessage="Keine Orte gefunden"
      placeholder="Ort suchen ..."
    />
  );
};

export default SearchBar;
