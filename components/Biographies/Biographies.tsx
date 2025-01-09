"use client";

import BiographiesMap from "@/components/BiographiesMap";
import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import PlaceSelector from "@/components/PlaceSelector";
import { Label } from "@/components/ui/label";
import fetcher from "@/lib/fetcher";
import { StyleSpecification } from "maplibre-gl";
import { FC, useMemo, useState } from "react";
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
import { DataTable } from "../ui/data-table";
import { columns } from "../biographyTable/columns";
import MapTitle from "../MapTitle";
import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";
import DataDownloader from "../DataDownloader";
import { flowsToIndividuals } from "@/lib/flowsToIndividuals";
import { addColorsToFlows } from "@/lib/addColorsToFlows";

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

  const { data: biographyData, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getBiographiesByCommonEvent>>
  >(`/api/biographies?${params}`, fetcher);

  const { data, individuals } = useMemo(() => {
    if (!biographyData) return { data: undefined, individuals: undefined };
    const flows = addColorsToFlows(biographyData);
    if (!flows) return { data: undefined, individuals: undefined };
    const individuals = flowsToIndividuals(flows);
    return { data: flows, individuals };
  }, [biographyData]);

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Biographien</MapTitle>
          <p>basierend auf gemeinsamen Ereignissen</p>
        </Card>
        <Card title="Auswahl der Ereignisse" collapsible defaultOpen>
          <div className="flex flex-col gap-5">
            <PlaceSelector place={place} onSelectHandler={updatePlace} />
            <div className="flex items-center gap-3">
              <Label>Ereignistyp</Label>
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
          </div>
        </Card>
        {data && (
          <>
            <Card title="Personen" collapsible>
              <DataTable data={individuals} columns={columns} />
            </Card>
            <Card title="Daten export" collapsible>
              <DataDownloader data={data} />
            </Card>
          </>
        )}
      </MapAside>

      <MapContainer>
        {isLoading && <Skeleton className="h-full w-full" />}
        <BiographiesMap style={style} data={data} />
      </MapContainer>
    </MapViewLayout>
  );
};

export default Biographies;
