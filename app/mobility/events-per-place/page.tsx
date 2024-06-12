import EventsMap from "../../../components/EventsMap";
import { getPlaceOriginDeath } from "../../../lib/getPlaceOriginDeath";
import MapStage from "../../../components/MapStage";
import { getMapStyle } from "../../../lib/getMapStyle";

export default async function Wp3() {
  const data = await getPlaceOriginDeath();
  const style = await getMapStyle();

  return (
    <>
      <h2>Kurmainz</h2>
      <p>Geburten- und Sterbeereignisse je Ort</p>
      <MapStage>
        <EventsMap style={style} data={data} />
      </MapStage>
    </>
  );
}
