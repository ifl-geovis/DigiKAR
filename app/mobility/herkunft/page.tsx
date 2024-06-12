import { getMapStyle } from "@/lib/getMapStyle";
import OriginsMapContainer from "@/components/OriginsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2>Kurmainz</h2>
      <p>Herkunft von Studenten der Universität Mainz</p>
      <OriginsMapContainer style={style} />
    </>
  );
}
