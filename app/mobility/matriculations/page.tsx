import { getMapStyle } from "@/lib/getMapStyle";
import Navigation from "../../../components/Navigation";
import MatriculationsMapContainer from "@/components/MatriculationsMapContainer";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="container">
        <h2>Matriculations of professors in Mainz</h2>
        <MatriculationsMapContainer style={style} />
      </main>
    </>
  );
}
