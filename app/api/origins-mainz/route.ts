import { getOriginsByTimeRange } from "@/lib/getOriginsByTimeRange";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const [min, max, lens] = [
    Number(params.get("min")),
    Number(params.get("max")),
    params.get("lens"),
  ];

  const res = await getOriginsByTimeRange(min, max, lens ?? undefined);

  return NextResponse.json(res);
}
