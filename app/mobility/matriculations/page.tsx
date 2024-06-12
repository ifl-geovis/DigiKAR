import { getMapStyle } from "@/lib/getMapStyle";
import MatriculationsMapContainer from "@/components/MatriculationsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2>Kurmainz</h2>
      <p>Immatrikulationen von Professoren der Universität Mainz</p>
      <MatriculationsMapContainer style={style} />
    </>
  );
}
