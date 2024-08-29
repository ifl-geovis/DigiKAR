"use client";

import BiographiesMap from "@/components/BiographiesMap";
import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import PlaceSelector from "@/components/PlaceSelector";
import { Label } from "@/components/ui/label";
import fetcher from "@/lib/fetcher";
import { User } from "lucide-react";
import { StyleSpecification } from "maplibre-gl";
import { FC, useState } from "react";
import useSWRImmutable from "swr/immutable";
import MapViewLayout from "../MapViewLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

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
    <MapViewLayout>
      <MapAside>
        <Card>
          <h2 className="flex items-center gap-3">Biographien</h2>
          <p>basierend auf gemeinsamen Ereignissen</p>
        </Card>
        <Card>
          <div className="flex flex-col gap-5">
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
        </Card>
      </MapAside>

      <MapContainer>
        {biographyIsLoading && <Skeleton className="h-full w-full" />}
        {biographyData && <BiographiesMap style={style} data={biographyData} />}
      </MapContainer>
    </MapViewLayout>
  );
};

export default Biographies;
