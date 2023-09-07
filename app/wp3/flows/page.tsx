import Navigation from "../../components/Navigation";
import FlowsMap from "../../components/FlowsMap";
import { getFlowsOriginDeath } from "../../lib/getFlowsOriginDeath";

export default async function NextPage() {
  const university = await getFlowsOriginDeath("university_mainz");
  const state_calendar = await getFlowsOriginDeath("state_calendar");

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>Kurmainz Geburtsort ⤍ Sterbeort</h2>
        <h3>Professoren</h3>
        <div className="h-[800px] w-full">
          <FlowsMap data={university} />
        </div>
        <h3 className="mt-10">Staatskalendar</h3>
        <div className="h-[800px] w-full">
          <FlowsMap data={state_calendar} />
        </div>
      </main>
    </>
  );
}
