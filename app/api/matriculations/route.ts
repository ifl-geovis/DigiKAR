import { getMatriculations } from "@/lib/get-matriculations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const [min, max, eventType] = [
    Number(params.get("min")),
    Number(params.get("max")),
    params.get("eventType"),
  ];

  const result = await getMatriculations(min, max, eventType ?? undefined);

  return NextResponse.json(result);
}
