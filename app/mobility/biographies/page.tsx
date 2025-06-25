import Biographies from "@/components/Biographies";
import { getMapStyle } from "@/lib/get-map-style";

export default async function NextPage() {
  const style = await getMapStyle("mobility");

  return (
    <>
      <Biographies style={style} />
    </>
  );
}
