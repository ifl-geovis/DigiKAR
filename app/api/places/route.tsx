import { getUniquePlaces } from "@/lib/get-unique-places";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("source") ?? undefined;

  try {
    const places = await getUniquePlaces(source);
    return NextResponse.json(places);
  } catch (error) {
    console.error({ error });
    return NextResponse.error();
  }
}
