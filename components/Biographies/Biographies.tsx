"use client";

import BiographiesMap from "@/components/BiographiesMap";
import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import PlaceSelector from "@/components/PlaceSelector";
import { Label } from "@/components/ui/label";
import fetcher from "@/lib/fetcher";
import { StyleSpecification } from "maplibre-gl";
import { FC, useCallback, useMemo, useState } from "react";
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
import { RowSelectionState } from "@tanstack/react-table";
import debounce from "lodash.debounce";
import { RxMixerVertical } from "react-icons/rx";
import { Slider } from "../ui/slider";

type Props = {
  style: StyleSpecification;
};

const Biographies: FC<Props> = ({ style }) => {
  const updatePlace = (place: string) => {
    setPlace(place);
    setParams(
      new URLSearchParams({
        eventType,
        place,
        functionality: functionality ?? "",
        timeRangeMin: timeRange?.[0].toString() ?? "",
        timeRangeMax: timeRange?.[1].toString() ?? "",
      }),
    );
  };

  const updateEventType = (eventType: string) => {
    setEventType(eventType);
    setParams(
      new URLSearchParams({
        eventType,
        place,
        functionality: functionality ?? "",
        timeRangeMin: timeRange?.[0].toString() ?? "",
        timeRangeMax: timeRange?.[1].toString() ?? "",
      }),
    );
  };

  const initialTimeRange = useMemo(() => [1477, 1806], []);
  const [initialMin, initialMax] = initialTimeRange;

  const [timeRange, setTimeRange] = useState(initialTimeRange);

  const updateFunctionality = (functionality: string | undefined) => {
    setFunctionality(functionality);
    setParams(
      new URLSearchParams({
        eventType,
        place,
        functionality: functionality ?? "",
        timeRangeMin: timeRange?.[0].toString() ?? "",
        timeRangeMax: timeRange?.[1].toString() ?? "",
      }),
    );
  };

  const [functionality, setFunctionality] = useState<string | undefined>(
    undefined,
  );
  const [eventType, setEventType] = useState<string>("Geburt");
  const [place, setPlace] = useState<string>("Mainz");

  const updateTimeRange = useMemo(
    () =>
      debounce(([min, max]: [number, number]) => {
        setTimeRange(timeRange);
        setParams(
          new URLSearchParams({
            eventType,
            place,
            functionality: functionality ?? "",
            timeRangeMin: min.toString(),
            timeRangeMax: max.toString(),
          }),
        );
      }, 1000),
    [place, eventType, timeRange, functionality],
  );

  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams({
      place: "Mainz",
      eventType: "Funktionsausübung",
      timerangeMin: initialTimeRange[0].toString(),
      timerangeMax: initialTimeRange[1].toString(),
      functionality: "Rat",
    }),
  );

  const onValueChange = useCallback(
    (value: [number, number]) => {
      setTimeRange(value);
      updateTimeRange(value);
    },
    [updateTimeRange, setTimeRange],
  );

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({}); //manage your own row selection state

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
              <Select
                defaultValue="Funktionsausübung"
                onValueChange={updateEventType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Wähle ein Ereignis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Geburt">Geburt</SelectItem>
                  <SelectItem value="Funktionsausübung">
                    Funktionsausübung
                  </SelectItem>
                  <SelectItem value="Studium">Studium</SelectItem>
                  <SelectItem value="Tod">Tod</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Label>Funktion (der Person)</Label>
              <Select defaultValue="Rat" onValueChange={updateFunctionality}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Wähle eine Funktion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rat">Rat</SelectItem>
                  <SelectItem value="Schultheiß">Schultheiß</SelectItem>
                  <SelectItem value="Kind">Kind</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-64 flex-col gap-3">
              <Label className="flex gap-2">
                <RxMixerVertical /> Zeitraum ({timeRange.join("-")})
              </Label>
              <div className="flex gap-5">
                <div>{initialMin}</div>
                <Slider
                  onValueChange={onValueChange}
                  min={initialMin}
                  max={initialMax}
                  defaultValue={initialTimeRange}
                />
                <div>{initialMax}</div>
              </div>
            </div>
          </div>
        </Card>
        {data && (
          <>
            <Card title="Personen" collapsible>
              <DataTable
                data={individuals}
                columns={columns}
                getRowId={(row) => row.personId}
                rowSelectionChangeHandler={setSelectedRows}
              />
            </Card>
            <Card title="Daten export" collapsible>
              <DataDownloader data={data} />
            </Card>
          </>
        )}
      </MapAside>

      <MapContainer>
        {isLoading && <Skeleton className="h-full w-full" />}
        <BiographiesMap style={style} data={data} selected={selectedRows} />
      </MapContainer>
    </MapViewLayout>
  );
};

export default Biographies;
