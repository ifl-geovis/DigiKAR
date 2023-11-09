import Navigation from "../../../components/Navigation";
import FlowMap from "../../../components/FlowMap";
import { getFlowsOriginDeath } from "../../../lib/getFlowsOriginDeath";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import MapStage from "@/components/MapStage";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const university = await getFlowsOriginDeath("university_mainz");
  const state_calendar_erfurt = await getFlowsOriginDeath(
    "state_calendar_erfurt"
  );
  const style = await getMapStyle();

  return (
    <>
      <Navigation />
      <main className="p-10 bg-slate-50">
        <h2 className="flex">
          Kurmainz Place of Birth <ArrowRightIcon /> Place of Death
        </h2>
        <h3>Professoren</h3>
        <MapStage>
          <FlowMap style={style} data={university} />
        </MapStage>
        <h3 className="mt-10">Staatskalender</h3>
        <MapStage>
          <FlowMap style={style} data={state_calendar_erfurt} />
        </MapStage>
      </main>
    </>
  );
}
