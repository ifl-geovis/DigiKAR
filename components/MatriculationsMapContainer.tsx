"use client";

import { getMatriculations } from "@/lib/getMatriculations";
import debounce from "lodash.debounce";
import { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import fetcher from "../lib/fetcher";
import MapStage from "./MapStage";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import MatriculationsMap from "./MatriculationsMap";

type Props = {
  style: StyleSpecification;
};

const MatriculationsMapContainer: FC<Props> = ({ style }) => {
  const initialTimeRange = useMemo(() => [1400, 1900], []);

  const [eventType, setEventType] = useState<undefined | string>(undefined);
  const [timeRange, setTimeRange] = useState(initialTimeRange);

  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams({
      min: initialTimeRange[0].toString(),
      max: initialTimeRange[1].toString(),
    }),
  );

  const updateParams = useMemo(
    () =>
      debounce(([min, max]: [number, number]) => {
        console.log("updating params");
        setParams(
          new URLSearchParams({ min: min.toString(), max: max.toString() }),
        );
      }, 1000),
    [],
  );

  const onValueChange = useCallback(
    (value: [number, number]) => {
      setTimeRange(value);
      updateParams(value);
    },
    [updateParams],
  );

  eventType ? params.set("eventType", eventType) : params.delete("eventType");

  const { data } = useSWRImmutable<
    Awaited<ReturnType<typeof getMatriculations>>
  >(`/api/matriculations?${params}`, fetcher);

  return (
    <>
      <div className="my-5 flex gap-10">
        <div className="flex w-64 flex-col gap-3">
          <Label>Time range</Label>
          <div className="flex gap-5">
            <div>{timeRange[0]}</div>
            <Slider
              onValueChange={onValueChange}
              min={initialTimeRange[0]}
              max={initialTimeRange[1]}
              defaultValue={initialTimeRange}
            />
            <div>{timeRange[1]}</div>
          </div>
        </div>
        <div>
          <Label>event type</Label>
          <Select
            defaultValue="Immatrikulation"
            onValueChange={(value) => setEventType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Wähle eine Sonde" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Immatrikulation">Immatrikulation</SelectItem>
              <SelectItem value="Studium">Studium</SelectItem>
              <SelectItem value="Promotion">Promotion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <MapStage>
        <MatriculationsMap style={style} data={data} />
      </MapStage>
    </>
  );
};

export default MatriculationsMapContainer;
