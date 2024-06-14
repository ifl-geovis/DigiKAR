import { getFunctionalitiesPerPlace } from "@/lib/getFunctionalitiesPerPlace";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const table = request.nextUrl.searchParams.get("table");
  const filter = request.nextUrl.searchParams.get("filter");
  const functionalities = await getFunctionalitiesPerPlace(
    table ?? "state_calendar_aschaffenburg",
    filter?.split(","),
  );

  return NextResponse.json(functionalities);
}
