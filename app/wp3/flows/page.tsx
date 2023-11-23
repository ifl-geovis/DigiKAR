import FlowMapContainer from "@/components/FlowMapContainer";
import { getMapStyle } from "@/lib/getMapStyle";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Navigation from "../../../components/Navigation";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="container">
        <h2 className="flex items-center gap-3">
          Kurmainz Place of Birth <ArrowRightIcon /> Place of Death
        </h2>
        <FlowMapContainer style={style} />
      </main>
    </>
  );
}
