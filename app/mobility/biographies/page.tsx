import Biographies from "@/components/Biographies";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <Biographies style={style} />
    </>
  );
}
