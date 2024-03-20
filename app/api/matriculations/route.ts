import { getMatriculations } from "@/lib/getMatriculations";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getMatriculations();

  return NextResponse.json(result);
}
