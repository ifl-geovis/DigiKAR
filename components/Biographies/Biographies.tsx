"use client";

import fetcher from "@/lib/fetcher";
import { StyleSpecification } from "maplibre-gl";
import { FC, useState } from "react";
import useSWRImmutable from "swr/immutable";
import BiographiesMap from "../BiographiesMap";
import MapStage from "../MapStage";
import PlaceSelector from "../PlaceSelector";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { User } from "lucide-react";

type Props = {
  style: StyleSpecification;
};

const Biographies: FC<Props> = ({ style }) => {
  const updatePlace = (place: string) => {
    setPlace(place);
    setParams(new URLSearchParams({ eventType, place }));
  };

  const updateEventType = (eventType: string) => {
    setEventType(eventType);
    setParams(new URLSearchParams({ eventType, place }));
  };

  const [eventType, setEventType] = useState<string>("Geburt");
  const [place, setPlace] = useState<string>("Heilbad Heiligenstadt");
  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams({
      place,
      eventType,
    }),
  );

  const { data: biographyData, isLoading: biographyIsLoading } =
    useSWRImmutable(`/api/biographies?${params}`, fetcher);
  return (
    <div>
      <div className="flex items-center gap-5">
        <PlaceSelector place={place} onSelectHandler={updatePlace} />
        <div className="flex items-center gap-3">
          <Label>Art des Ereignisses</Label>
          <Select defaultValue="Geburt" onValueChange={updateEventType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wähle ein Ereignis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Geburt">Geburt</SelectItem>
              <SelectItem value="Studium">Studium</SelectItem>
              <SelectItem value="Tod">Tod</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {biographyData && (
          <div className="flex items-center gap-2">
            <User /> {biographyData.length}
          </div>
        )}
      </div>
      <MapStage>
        {biographyIsLoading && <Skeleton className="h-full w-full" />}
        {biographyData && <BiographiesMap style={style} data={biographyData} />}
      </MapStage>
    </div>
  );
};

export default Biographies;
