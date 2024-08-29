import PlaceFunctionalitiesMap from "../../../components/PlaceFunctionalitiesMap";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const style = await getMapStyle();

  return <PlaceFunctionalitiesMap style={style} />;
}
