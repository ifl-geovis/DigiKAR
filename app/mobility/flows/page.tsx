import FlowMapContainer from "@/components/FlowMapContainer";
import { getMapStyle } from "@/lib/getMapStyle";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2 className="flex items-center gap-3">
        Kurmainz Place of Birth <ArrowRightIcon /> Place of Death
      </h2>
      <FlowMapContainer style={style} />
    </>
  );
}
