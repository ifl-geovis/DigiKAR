import { getMapStyle } from "@/lib/getMapStyle";
import OriginsMapContainer from "@/components/OriginsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2>Herkunft Studenten Universität Mainz</h2>
      <OriginsMapContainer style={style} />
    </>
  );
}
