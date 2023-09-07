import Navigation from "../components/Navigation";
import EventsMap from "../components/EventsMap";
import { getPlaceOriginDeath } from "../lib/getPlaceOriginDeath";

export default async function Wp3() {
  const data = await getPlaceOriginDeath();

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>Kurmainz</h2>
        <p>personenbezogene Daten</p>
        <div className="h-[800px] w-full">
          <EventsMap data={data} />
        </div>
      </main>
    </>
  );
}
