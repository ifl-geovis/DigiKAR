import FlowMapContainer from "@/components/FlowMapContainer";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const mapStyle = await getMapStyle();
  return <FlowMapContainer mapStyle={mapStyle} />;
}
