"use client";

import fetcher from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { Point } from "geojson";
import { LngLat } from "maplibre-gl";
import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { useMap } from "react-map-gl/maplibre";
import useSWRImmutable from "swr/immutable";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

type Place = {
  id: string;
  geometry: Point;
  label: string;
  case_study: string;
};

const SearchBar = () => {
  const { data } = useSWRImmutable<Place[]>(
    `https://api.geohistoricaldata.org/digikar/orte?in_sample_regions=is.true&order=label.asc`,
    fetcher,
  );
  const { rightsMap } = useMap();
  console.log({ rightsMap });

  const [value, setValue] = useState<string | undefined>(undefined);
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
    undefined,
  );
  console.log({ value, open, place: selectedPlace });

  useEffect(() => {
    if (!selectedPlace || !data) return;
    const coordinates = data.find((d) => d.id == selectedPlace?.id)?.geometry
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
  }, [selectedPlace, data, rightsMap]);

  const handleSelect = (place: Place) => {
    setValue(place.label);
    setSelectedPlace(place);
    setIsListVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setIsListVisible(true);
  };

  return (
    <Command>
      <CommandInput
        value={value}
        onChangeCapture={handleInputChange}
        placeholder={`Suchen nach einem Ort ...`}
      />
      <CommandList>
        {isListVisible && (
          <>
            <CommandEmpty>Kein Ergebnis.</CommandEmpty>
            <CommandGroup>
              {isListVisible &&
                data?.map((d) => (
                  <CommandItem key={d.id} onSelect={() => handleSelect(d)}>
                    <LuCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPlace?.id === d.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {d.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
};

export default SearchBar;
