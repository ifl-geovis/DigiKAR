import Navigation from "../components/Navigation";
import RightsMap from "../components/RightsMap";
import { loadAnsbachData } from "../lib/loadAnsbachData";

export default async function Wp2() {
  const data = await loadAnsbachData();

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>Ansbach</h2>
        <p>Rechte</p>
        <div className="h-[800px] w-full">
          <RightsMap data={data} />
        </div>
      </main>
    </>
  );
}
