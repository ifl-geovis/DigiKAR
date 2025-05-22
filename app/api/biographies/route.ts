import { getBiographiesByCommonEvent } from "@/lib/get-biographies-by-common-event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const [eventType, place, min, max, functionality] = [
    params.get("eventType"),
    params.get("place"),
    params.get("timeRangeMin"),
    params.get("timeRangeMax"),
    params.get("functionality"),
  ];

  if (!place || !eventType)
    return NextResponse.json(
      {
        error:
          "Missing paramters. This request requires 2 parameters: place, eventType.",
      },
      { status: 500 },
    );

  try {
    const bios = await getBiographiesByCommonEvent(
      eventType,
      place,
      functionality ?? "",
      [min ? parseInt(min) : 0, max ? parseInt(max) : new Date().getFullYear()],
    );
    return NextResponse.json(bios);
  } catch (error) {
    console.error({ error });
    return NextResponse.error();
  }
}
