import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const [eventType, place] = [params.get("eventType"), params.get("place")];

  if (!place || !eventType)
    return NextResponse.json(
      {
        error:
          "Missing paramters. This request requires 2 parameters: place, eventType.",
      },
      { status: 500 },
    );

  try {
    const bios = await getBiographiesByCommonEvent(eventType, place);
    return NextResponse.json(bios);
  } catch (error) {
    console.error({ error });
    return NextResponse.error();
  }
}
