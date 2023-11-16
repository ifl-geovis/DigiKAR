"use client";

import { Label } from "@/components/ui/label";
import fetcher from "@/lib/fetcher";
import { getFlowsOriginDeath } from "@/lib/getFlowsOriginDeath";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

  const { data, isLoading, error } = useSWRImmutable<
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
            <SelectItem value="state_calendar_erfurt">Erfurt</SelectItem>
            <SelectItem value="university_mainz">Mainz</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <MapStage>
        {isLoading && <Skeleton className="w-full h-full" />}
        {data && <FlowMap data={data} style={style} />}
      </MapStage>
    </>
  );
};

export default FlowMapContainer;
