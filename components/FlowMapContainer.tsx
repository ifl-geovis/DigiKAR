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
import { LuArrowRight } from "react-icons/lu";
import { FC, useState } from "react";
import useSWRImmutable from "swr/immutable";
import MapTitle from "./MapTitle";
import { StyleSpecification } from "maplibre-gl";

type Props = {
  mapStyle: StyleSpecification;
};

const FlowMapContainer: FC<Props> = ({ mapStyle }) => {
  const [lens, setLens] = useState("Staatskalender Erfurt");

  const { data, isLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getFlowsOriginDeath>>
  >(`/api/origin-death-flows/${lens}`, fetcher);

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Kurmainz</MapTitle>
          <p>
            Geburtsort <LuArrowRight className="inline w-4" /> Sterbeort
          </p>
        </Card>
        <Card>
          <div className="grid max-w-sm items-center gap-1.5">
            <Label>Sonde</Label>
            <Select
              defaultValue={lens}
              onValueChange={(value) => setLens(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wähle eine Sonde" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Alle Datensonden</SelectItem>
                <SelectGroup className="mt-1 border-t border-gray-200">
                  <SelectLabel className="mt-2 text-xs">Datensonde</SelectLabel>
                  <SelectItem value="Staatskalender Erfurt">Erfurt</SelectItem>
                  <SelectItem value="Reichskammergericht">
                    Reichskammergericht
                  </SelectItem>
                  <SelectItem disabled value="Universität Mainz Studierende">
                    Universität Mainz Studierende
                  </SelectItem>
                  <SelectItem disabled value="Domkapitulare Mainz">
                    Domkapitulare Mainz
                  </SelectItem>
                  <SelectItem disabled value="Staatskalendar Aschaffenburg">
                    Staatskalendar Aschaffenburg
                  </SelectItem>
                  <SelectItem disabled value="Staatskalendar Jahns">
                    Staatskalendar Jahns
                  </SelectItem>
                  <SelectItem disabled value="Universität Mainz Professoren">
                    Universität Mainz Professoren
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </MapAside>
      <MapContainer>
        {isLoading && <Skeleton className="h-full w-full" />}
        {data && data.length > 1 && <FlowMap data={data} mapStyle={mapStyle} />}
      </MapContainer>
    </MapViewLayout>
  );
};

export default FlowMapContainer;
