import MapStage from "@/components/MapStage";
import Navigation from "../../../components/Navigation";
import BiographiesMap from "@/components/BiographiesMap/";
import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const data = await getBiographiesByCommonEvent("Geburt", "Heilbad%");
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="container">
        <h2 className="flex items-center gap-3">
          Biographies based on common events
        </h2>
        <MapStage>
          <BiographiesMap data={data} style={style} />
        </MapStage>
      </main>
    </>
  );
}
