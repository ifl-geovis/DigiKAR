import FlowMapContainer from "@/components/FlowMapContainer";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default async function NextPage() {
  return (
    <>
      <h2 className="flex items-center gap-3">Kurmainz</h2>
      <p>
        Geburtsort <ArrowRightIcon className="inline" /> Sterbeort
      </p>
      <FlowMapContainer />
    </>
  );
}
