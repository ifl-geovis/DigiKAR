import getElectoralSaxonyData from "@/lib/getElectoralSaxonyData";
import MapStage from "../../../components/MapStage";
import Navigation from "../../../components/Navigation";
import RightsMap from "../../../components/RightsMap";
import { getMapStyle } from "../../../lib/getMapStyle";

export default async function Wp2() {
  const data = await getElectoralSaxonyData();
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="p-10">
        <div className="grid grid-cols-[350px_auto] gap-5">
          <div>
            <h2>Kursachsen</h2>
            <h3>Rights and potentates</h3>
            <div className="mt-3">
              <h3>Legend</h3>
              <p className="italic">to be defined</p>
            </div>
          </div>
          <MapStage>
            <RightsMap data={data} style={style} />
          </MapStage>
        </div>
      </main>
    </>
  );
}
