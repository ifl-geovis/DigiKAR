"use client";

import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapViewLayout from "@/components/MapViewLayout";
import ProportionalSymbolMap from "@/components/ProportionalSymbolMap";
import { Label } from "@/components/ui/label";
import fetcher from "@/lib/fetcher";
import { getMatriculations } from "@/lib/getMatriculations";
import debounce from "lodash.debounce";
import { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useMemo, useState } from "react";
import useSWRImmutable from "swr/immutable";
import MapTitle from "./MapTitle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";

type Props = {
  style: StyleSpecification;
};

const MatriculationsMapContainer: FC<Props> = ({ style }) => {
  const initialTimeRange = useMemo(() => [1400, 1900], []);
  const [initialMin, initialMax] = initialTimeRange;

  const [eventType, setEventType] = useState<undefined | string>(undefined);
  const [timeRange, setTimeRange] = useState(initialTimeRange);

  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams({
      min: initialMin.toString(),
      max: initialMax.toString(),
    }),
  );

  const updateParams = useMemo(
    () =>
      debounce(
        ([min, max]: [number, number]) =>
          setParams(
            new URLSearchParams({ min: min.toString(), max: max.toString() }),
          ),
        1000,
      ),
    [],
  );

  const onValueChange = useCallback(
    (value: [number, number]) => {
      setTimeRange(value);
      updateParams(value);
    },
    [updateParams],
  );

  if (eventType) params.set("eventType", eventType);
  if (!eventType) params.delete("eventType");

  const { data, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getMatriculations>>
  >(`/api/matriculations?${params}`, fetcher, { keepPreviousData: true });

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Kurmainz</MapTitle>
          <p>Immatrikulationen von Professoren der Universität Mainz</p>
        </Card>
        <Card>
          <div className="flex flex-col gap-5">
            <div className="flex w-64 flex-col gap-3">
              <Label>Zeitraum ({timeRange.join("–")})</Label>
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
            <div>
              <Label>Art des Ereignisses</Label>
              <Select
                defaultValue="Immatrikulation"
                onValueChange={(value) => setEventType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Wähle eine Sonde" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immatrikulation">
                    Immatrikulation
                  </SelectItem>
                  <SelectItem value="Studium">Studium</SelectItem>
                  <SelectItem value="Promotion">Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </MapAside>

      <MapContainer>
        <ProportionalSymbolMap
          style={style}
          data={data}
          isLoading={isLoading}
        />
      </MapContainer>
    </MapViewLayout>
  );
};

export default MatriculationsMapContainer;
