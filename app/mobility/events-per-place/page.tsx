import Card from "@/components/Card";
import EventsMap from "@/components/EventsMap";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import { getMapStyle } from "@/lib/getMapStyle";
import { getPlaceOriginDeath } from "@/lib/getPlaceOriginDeath";
import { FC } from "react";

export default async function Wp3() {
  const data = await getPlaceOriginDeath();
  const style = await getMapStyle();

  return (
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Kurmainz</MapTitle>
        </Card>
        <Card>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <Circle color="pink" />
              Geburten- und
            </div>
            <div className="flex items-center gap-1">
              <Circle color="red" />
              Sterbeereignisse je Ort
            </div>
          </div>
        </Card>
      </MapAside>
      <MapContainer>
        <EventsMap style={style} data={data} />
      </MapContainer>
    </MapViewLayout>
  );
}

const Circle: FC<{ color: string }> = ({ color }) => {
  const size = 20;
  return (
    <svg width={size} height={size} className="inline">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - 4) / 2}
        strokeWidth={2}
        fill="none"
        stroke={color}
      />
    </svg>
  );
};
