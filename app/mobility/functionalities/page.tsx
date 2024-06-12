import PlaceFunctionalitiesMap from "../../../components/PlaceFunctionalitiesMap";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2>Kurmainz</h2>
      <p>Funktionen von Personen je Institution</p>
      <PlaceFunctionalitiesMap style={style} />
    </>
  );
}
