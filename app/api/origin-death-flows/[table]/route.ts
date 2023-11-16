import { getFlowsOriginDeath } from "@/lib/getFlowsOriginDeath";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tableName = request.nextUrl.pathname.split("/").pop();
  const flows = await getFlowsOriginDeath(tableName);

  return NextResponse.json(flows);
}
