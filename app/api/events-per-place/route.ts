import { getPlaceOriginDeath } from "@/lib/getPlaceOriginDeath";
import { NextResponse } from "next/server";

export async function GET() {
  const functionalities = await getPlaceOriginDeath();

  return NextResponse.json(functionalities);
}
