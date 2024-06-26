import EventsMap from "../../../components/EventsMap";
import { getPlaceOriginDeath } from "../../../lib/getPlaceOriginDeath";
import MapStage from "../../../components/MapStage";
import { getMapStyle } from "../../../lib/getMapStyle";
import { FC } from "react";

export default async function Wp3() {
  const data = await getPlaceOriginDeath();
  const style = await getMapStyle();

  return (
    <>
      <h2>Kurmainz</h2>
      <p className="mb-3">
        <Circle color="pink" /> Geburten- <Circle color="red" /> und
        Sterbeereignisse je Ort
      </p>
      <MapStage>
        <EventsMap style={style} data={data} />
      </MapStage>
    </>
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
