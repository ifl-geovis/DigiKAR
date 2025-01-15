import { getFlowsOriginDeath } from "@/lib/getFlowsOriginDeath";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lens = request.nextUrl.pathname.split("/").pop();
  const flows = await getFlowsOriginDeath(
    lens ? decodeURI(lens).normalize() : undefined,
  );

  return NextResponse.json(flows);
}
