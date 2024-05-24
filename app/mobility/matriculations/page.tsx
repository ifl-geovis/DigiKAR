import { getMapStyle } from "@/lib/getMapStyle";
import MatriculationsMapContainer from "@/components/MatriculationsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2>Matriculations of professors in Mainz</h2>
      <MatriculationsMapContainer style={style} />
    </>
  );
}
