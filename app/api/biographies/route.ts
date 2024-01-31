import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";
import { NextResponse } from "next/server";

export async function GET() {
  // TODO: add dynamic arguments here
  const bios = await getBiographiesByCommonEvent("Geburt", "Heilbad%");

  return NextResponse.json(bios);
}
