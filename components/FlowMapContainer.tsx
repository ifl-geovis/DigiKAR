"use client";

import { Label } from "@/components/ui/label";
import fetcher from "@/lib/fetcher";
import { getFlowsOriginDeath } from "@/lib/getFlowsOriginDeath";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { StyleSpecification } from "maplibre-gl";
import { FC, useState } from "react";
import useSWRImmutable from "swr/immutable";
import FlowMap from "./FlowMap";
import MapStage from "./MapStage";
import { Skeleton } from "./ui/skeleton";

type Props = {
  style: StyleSpecification;
};

const FlowMapContainer: FC<Props> = ({ style }) => {
  const [table, setTable] = useState("university_mainz");

  const { data, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getFlowsOriginDeath>>
  >(`/api/origin-death-flows/${table}`, fetcher);

  return (
    <>
      <div className="grid max-w-sm items-center gap-1.5 my-4">
        <Label>Sonde</Label>
        <Select defaultValue={table} onValueChange={(value) => setTable(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wähle eine Sonde" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">All analytical lenses</SelectItem>
            <SelectGroup className="border-gray-200 border-t mt-1">
              <SelectLabel className="text-xs mt-2">
                Analytical lenses
              </SelectLabel>
              <SelectItem value="state_calendar_erfurt">Erfurt</SelectItem>
              <SelectItem value="university_mainz">Mainz</SelectItem>
              <SelectItem value="state_calendar_aschaffenburg">
                Aschaffenburg
              </SelectItem>
              <SelectItem value="state_calendar_jahns">Jahns</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <MapStage>
        {isLoading && <Skeleton className="w-full h-full" />}
        {data && data.length > 1 && <FlowMap data={data} style={style} />}
      </MapStage>
    </>
  );
};

export default FlowMapContainer;
