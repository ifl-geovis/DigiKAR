"use client";

import Card from "@/components/Card";
import FlowMap from "@/components/FlowMap";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapViewLayout from "@/components/MapViewLayout";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import fetcher from "@/lib/fetcher";
import { getFlowsOriginDeath } from "@/lib/getFlowsOriginDeath";
import { ArrowRightIcon } from "lucide-react";
import { FC, useState } from "react";
import useSWRImmutable from "swr/immutable";

const FlowMapContainer: FC = () => {
  const [table, setTable] = useState("university_mainz");

  const { data, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getFlowsOriginDeath>>
  >(`/api/origin-death-flows/${table}`, fetcher);

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <h2 className="flex items-baseline gap-3">Kurmainz</h2>
          <p>
            Geburtsort <ArrowRightIcon className="inline w-4" /> Sterbeort
          </p>
        </Card>
        <Card>
          <div className="grid max-w-sm items-center gap-1.5">
            <Label>Sonde</Label>
            <Select
              defaultValue={table}
              onValueChange={(value) => setTable(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wähle eine Sonde" />
              </SelectTrigger>
              <SelectContent>
                {/* TODO: enable items as soon as students data get person_ids */}
                <SelectItem disabled value="any">
                  Alle Datensonden
                </SelectItem>
                <SelectGroup className="mt-1 border-t border-gray-200">
                  <SelectLabel className="mt-2 text-xs">Datensonde</SelectLabel>
                  <SelectItem value="state_calendar_erfurt">Erfurt</SelectItem>
                  <SelectItem value="university_mainz">Mainz</SelectItem>
                  <SelectItem disabled value="state_calendar_aschaffenburg">
                    Aschaffenburg
                  </SelectItem>
                  <SelectItem value="state_calendar_jahns">Jahns</SelectItem>
                  <SelectItem disabled value="students">
                    Studenten Universität Mainz
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </MapAside>
      <MapContainer>
        {isLoading && <Skeleton className="h-full w-full" />}
        {data && data.length > 1 && <FlowMap data={data} />}
      </MapContainer>
    </MapViewLayout>
  );
};

export default FlowMapContainer;
