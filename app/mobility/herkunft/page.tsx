import { getMapStyle } from "@/lib/get-map-style";
import OriginsMapContainer from "@/components/OriginsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return <OriginsMapContainer style={style} />;
}
