import { getFunctionalitiesPerPlace } from "@/lib/get-functionalities-per-place";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lens = request.nextUrl.searchParams.get("lens");
  const filter = request.nextUrl.searchParams.get("filter");

  if (!lens) {
    return NextResponse.json({
      error: "Missing lens parameter",
      status: 400,
    });
  }

  const functionalities = await getFunctionalitiesPerPlace(
    lens,
    filter?.split(","),
  );

  return NextResponse.json(functionalities);
}
