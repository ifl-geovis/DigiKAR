import { getPlaceOriginDeath } from "@/lib/get-place-origin-death";
import { NextResponse } from "next/server";

export async function GET() {
  const functionalities = await getPlaceOriginDeath();

  return NextResponse.json(functionalities);
}
