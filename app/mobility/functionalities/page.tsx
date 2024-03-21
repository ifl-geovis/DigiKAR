import PlaceFunctionalitiesMap from "../../../components/PlaceFunctionalitiesMap";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2>AP3 person functionalities</h2>
      <PlaceFunctionalitiesMap style={style} />
    </>
  );
}
