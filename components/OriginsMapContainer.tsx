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
import { Slider } from "./ui/slider";
import ProportionalSymbol from "./ProportionalSymbolMap";
import { RxMixerVertical } from "react-icons/rx";

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
    <>
      <div className="my-5 flex gap-10">
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
      <MapStage>
        <ProportionalSymbol style={style} data={data} isLoading={isLoading} />
      </MapStage>
    </>
  );
};

export default OriginsMapContainer;
