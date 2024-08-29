import { getMapStyle } from "@/lib/getMapStyle";
import OriginsMapContainer from "@/components/OriginsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return <OriginsMapContainer style={style} />;
}
