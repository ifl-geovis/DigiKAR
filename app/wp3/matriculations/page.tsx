import MatriculationsMap from "@/components/MatriculationsMap";
import { getMapStyle } from "@/lib/getMapStyle";
import Navigation from "../../../components/Navigation";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="container">
        <h2>Matriculations of professors in Mainz</h2>
        <MatriculationsMap style={style} />
      </main>
    </>
  );
}
