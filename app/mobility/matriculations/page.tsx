import { getMapStyle } from "@/lib/get-map-style";
import MatriculationsMapContainer from "@/components/MatriculationsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle("mobility");

  return <MatriculationsMapContainer style={style} />;
}
