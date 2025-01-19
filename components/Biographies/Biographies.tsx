"use client";

import BiographiesMap from "@/components/BiographiesMap";
import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import PlaceSelector from "@/components/PlaceSelector";
import { Label } from "@/components/ui/label";
import { addColorsToFlows } from "@/lib/addColorsToFlows";
import fetcher from "@/lib/fetcher";
import { flowsToIndividuals } from "@/lib/flowsToIndividuals";
import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";
import { RowSelectionState } from "@tanstack/react-table";
import debounce from "lodash.debounce";
import { StyleSpecification } from "maplibre-gl";
import { FC, useCallback, useMemo, useState } from "react";
import { RxMixerVertical } from "react-icons/rx";
import useSWRImmutable from "swr/immutable";
import { columns } from "../biographyTable/columns";
import DataDownloader from "../DataDownloader";
import MapTitle from "../MapTitle";
import MapViewLayout from "../MapViewLayout";
import { DataTable } from "../ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Slider } from "../ui/slider";

type Props = {
  style: StyleSpecification;
};

const Biographies: FC<Props> = ({ style }) => {
  const initialTimeRange = useMemo(() => [1477, 1806], []);
  const [state, setState] = useState({
    place: "Mainz",
    eventType: "Funktionsausübung",
    timeRange: initialTimeRange,
    functionality: "Rat",
  });

  const params = new URLSearchParams({
    place: state.place,
    eventType: state.eventType,
    timeRangeMin: state.timeRange[0].toString(),
    timeRangeMax: state.timeRange[1].toString(),
    functionality: state.functionality,
  });

  const debouncedSetState = debounce((value: [number, number]) => {
    setState((prev) => ({ ...prev, timeRange: value }));
  });

  const onValueChange = useCallback(
    (value: [number, number]) => debouncedSetState(value),
    [debouncedSetState],
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
            <PlaceSelector
              place={state.place}
              onSelectHandler={(place) =>
                setState((prevState) => ({ ...prevState, place }))
              }
            />
            <div className="flex items-center gap-3">
              <Label>Ereignistyp</Label>
              <Select
                defaultValue={state.eventType}
                onValueChange={(eventType) =>
                  setState((prevState) => ({ ...prevState, eventType }))
                }
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
              <Select
                defaultValue={state.functionality}
                onValueChange={(functionality) =>
                  setState((prevState) => ({ ...prevState, functionality }))
                }
              >
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
                <RxMixerVertical /> Zeitraum ({state.timeRange.join("-")})
              </Label>
              <div className="flex gap-5">
                <div>{initialTimeRange[0]}</div>
                <Slider
                  onValueChange={onValueChange}
                  min={initialTimeRange[0]}
                  max={initialTimeRange[1]}
                  defaultValue={initialTimeRange}
                />
                <div>{initialTimeRange[1]}</div>
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
