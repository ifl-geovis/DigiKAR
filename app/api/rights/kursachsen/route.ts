import getElectoralSaxonyData from "@/lib/getElectoralSaxonyData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit");
  const data = await getElectoralSaxonyData(
    limit ? parseInt(limit) : undefined
  );
  return NextResponse.json({ data });
}
