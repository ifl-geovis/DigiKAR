import Navigation from "../../components/Navigation";
import EventsMap from "../../components/EventsMap";
import { getPlaceOriginDeath } from "../../lib/getPlaceOriginDeath";
import MapStage from "../../components/MapStage";
import { getMapStyle } from "../../lib/getMapStyle";

export default async function Wp3() {
  const data = await getPlaceOriginDeath();
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>Kurmainz</h2>
        <p>personenbezogene Daten</p>
        <MapStage>
          <EventsMap style={style} data={data} />
        </MapStage>
      </main>
    </>
  );
}
