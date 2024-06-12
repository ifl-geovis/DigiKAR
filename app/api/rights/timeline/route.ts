import { getRecordsPerYear } from "@/lib/getRecordsPerYear";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getRecordsPerYear();
  return NextResponse.json({ data });
}
