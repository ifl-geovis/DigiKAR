import PlaceFunctionalitiesMap from "../../../components/PlaceFunctionalitiesMap";
import { getMapStyle } from "@/lib/get-map-style";

export default async function NextPage() {
  const style = await getMapStyle("mobility");

  return <PlaceFunctionalitiesMap style={style} />;
}
