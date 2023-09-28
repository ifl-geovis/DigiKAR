import Navigation from "../../components/Navigation";
import { getFunctionsPerPlace } from "../../lib/getFunctionsPerPlace";

export default async function Functions() {
  const data = await getFunctionsPerPlace("state_calendar_aschaffenburg");
  console.log(data.slice(0, 3));

  return (
    <>
      <Navigation />
      <main className="p-10">
        <h2>AP3 person functions</h2>
        <p>functions</p>
      </main>
    </>
  );
}
