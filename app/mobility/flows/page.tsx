import FlowMapContainer from "@/components/FlowMapContainer";
import { getMapStyle } from "@/lib/get-map-style";

export default async function NextPage() {
  const mapStyle = await getMapStyle("mobility");
  return <FlowMapContainer mapStyle={mapStyle} />;
}
