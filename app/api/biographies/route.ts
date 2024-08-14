import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const place = request.nextUrl.searchParams.get("place");

  try {
    const bios = await getBiographiesByCommonEvent("Geburt", place);
    return NextResponse.json(bios);
  } catch (error) {
    console.error({ error });
    return NextResponse.error();
  }
}
