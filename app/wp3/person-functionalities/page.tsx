import PlaceFunctionalitiesMap from "../../components/PlaceFunctionalitiesMap";
import Navigation from "../../components/Navigation";
import { getFunctionalitiesPerPlace } from "../../lib/getFunctionalitiesPerPlace";
import { getMapStyle } from "@/app/lib/getMapStyle";
import MapStage from "@/app/components/MapStage";

export default async function Functions() {
  const data = await getFunctionalitiesPerPlace("state_calendar_aschaffenburg");
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>AP3 person functionalities</h2>
        <p>functions</p>
        <MapStage>
          <PlaceFunctionalitiesMap style={style} data={data} />
        </MapStage>
      </main>
    </>
  );
}
