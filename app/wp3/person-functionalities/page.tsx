import PlaceFunctionalitiesMap from "../../../components/PlaceFunctionalitiesMap";
import Navigation from "../../../components/Navigation";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function Functions() {
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>AP3 person functionalities</h2>
        <PlaceFunctionalitiesMap style={style} />
      </main>
    </>
  );
}
