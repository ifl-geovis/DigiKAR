"use client";

import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import ProportionalSymbol from "@/components/ProportionalSymbolMap";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import fetcher from "@/lib/fetcher";
import { getMatriculations } from "@/lib/getMatriculations";
import debounce from "lodash.debounce";
import { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useMemo, useState } from "react";
import { RxMixerVertical } from "react-icons/rx";
import useSWRImmutable from "swr/immutable";

type Props = {
  style: StyleSpecification;
};

const OriginsMapContainer: FC<Props> = ({ style }) => {
  const initialTimeRange = useMemo(() => [1477, 1806], []);
  const [initialMin, initialMax] = initialTimeRange;

  const [timeRange, setTimeRange] = useState(initialTimeRange);

  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams({
      min: initialMin.toString(),
      max: initialMax.toString(),
    }),
  );

  const updateParams = useMemo(
    () =>
      debounce(([min, max]: [number, number]) => {
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

  const { data, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getMatriculations>>
  >(`/api/origins-mainz?${params}`, fetcher, { keepPreviousData: true });

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Kurmainz</MapTitle>
          <p>Herkunft von Studenten der Universität Mainz</p>
        </Card>
        <Card>
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
        </Card>
      </MapAside>
      <MapContainer>
        <ProportionalSymbol style={style} data={data} isLoading={isLoading} />
      </MapContainer>
    </MapViewLayout>
  );
};

export default OriginsMapContainer;
