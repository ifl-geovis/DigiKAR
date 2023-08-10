import { promises as fs } from "fs";
import Navigation from "../components/Navigation";
import EventsMap from "../components/EventsMap";
import { loadFlowsOriginDeath } from "../lib/loadFlowsOriginDeath";

export default async function Wp3() {
  const file = await fs.readFile("app/data/placeOriginDeath.json", "utf-8");
  const data = await JSON.parse(file);

  const data2 = await loadFlowsOriginDeath();
  console.table(data2.map((d) => d.properties));

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
