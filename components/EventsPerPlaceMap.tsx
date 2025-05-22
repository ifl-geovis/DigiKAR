"use client";

import Card from "@/components/Card";
import EventsMap from "@/components/EventsMap";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import fetcher from "@/lib/fetcher";
import { getPlaceOriginDeath } from "@/lib/get-place-origin-death";
import { scaleOrdinal } from "d3";
import { schemeObservable10 } from "d3-scale-chromatic";
import { StyleSpecification } from "maplibre-gl";
import { FC } from "react";
import useSWRImmutable from "swr/immutable";

type Props = {
  mapStyle: StyleSpecification;
};

const EventsPerPlaceMap: FC<Props> = ({ mapStyle }) => {
  const { data } = useSWRImmutable<
    Awaited<ReturnType<typeof getPlaceOriginDeath>>
  >(`/api/events-per-place/`, fetcher);

  const eventDomain = Array.from(
    new Set(
      data?.flatMap((d) => d.properties.events.flatMap((d) => d.event_type)),
    ),
  );
  const colorScale = scaleOrdinal<string, string>(schemeObservable10)
    .domain(eventDomain)
    .unknown("gray");

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Kurmainz</MapTitle>
        </Card>
        <Card>
          <p className="mb-2">Anzahl der Ereignisse je Ort</p>
          <ul className="space-y-1">
            {eventDomain.map((eventType) => (
              <li key={eventType} className="flex gap-2">
                <div
                  className="aspect-square w-6 rounded-sm"
                  style={{
                    backgroundColor: `${colorScale(eventType)}20`,
                    border: `1px solid ${colorScale(eventType)}`,
                  }}
                ></div>
                <span>{eventType}</span>
              </li>
            ))}
          </ul>
        </Card>
      </MapAside>
      <MapContainer>
        {data && (
          <EventsMap style={mapStyle} data={data} eventDomain={eventDomain} />
        )}
      </MapContainer>
    </MapViewLayout>
  );
};

export default EventsPerPlaceMap;
