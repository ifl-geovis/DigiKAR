import Biographies from "@/components/Biographies";
import { getMapStyle } from "@/lib/getMapStyle";
import Navigation from "../../../components/Navigation";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="container">
        <h2 className="flex items-center gap-3">
          Biographies based on common events
        </h2>
        <Biographies style={style} />
      </main>
    </>
  );
}
