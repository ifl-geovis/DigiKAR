import MapStage from "../components/MapStage";
import Navigation from "../components/Navigation";
import RightsMap from "../components/RightsMap";
import { getMapStyle } from "../lib/getMapStyle";
import { loadAnsbachData } from "../lib/loadAnsbachData";

export default async function Wp2() {
  const data = await loadAnsbachData();
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>Ansbach</h2>
        <p>Rechte</p>
        <MapStage>
          <RightsMap data={data} style={style} />
        </MapStage>
      </main>
    </>
  );
}
