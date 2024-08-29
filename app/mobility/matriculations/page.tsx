import { getMapStyle } from "@/lib/getMapStyle";
import MatriculationsMapContainer from "@/components/MatriculationsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return <MatriculationsMapContainer style={style} />;
}
