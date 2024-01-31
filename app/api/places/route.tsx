import { getUniquePlaces } from "@/lib/getUniquePlaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("source") ?? undefined;
  const places = await getUniquePlaces(source);

  return NextResponse.json(places);
}
