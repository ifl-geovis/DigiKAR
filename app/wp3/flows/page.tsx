import Navigation from "../../components/Navigation";
import FlowMap from "../../components/FlowMap";
import { getFlowsOriginDeath } from "../../lib/getFlowsOriginDeath";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import MapStage from "@/app/components/MapStage";
import { getMapStyle } from "@/app/lib/getMapStyle";

export default async function NextPage() {
  const university = await getFlowsOriginDeath("university_mainz");
  const state_calendar = await getFlowsOriginDeath("state_calendar");
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="p-10 bg-slate-50">
        <h2 className="flex">
          Kurmainz Geburtsort <ArrowRightIcon /> Sterbeort
        </h2>
        <h3>Professoren</h3>
        <div className="h-[800px] w-full shadow-md rounded-sm bg-white">
          <FlowMap style={style} data={university} />
        </div>
        <h3 className="mt-10">Staatskalendar</h3>
        <MapStage>
          <FlowMap style={style} data={state_calendar} />
        </MapStage>
      </main>
    </>
  );
}
