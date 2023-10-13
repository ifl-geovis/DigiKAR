import { getFunctionalitiesPerPlace } from "@/app/lib/getFunctionalitiesPerPlace";

export async function GET() {
  const functionalities = await getFunctionalitiesPerPlace(
    "state_calendar_aschaffenburg",
    ["Schultheiß", "Rat", "Anwalt"]
  );

  return Response.json({ functionalities });
}
