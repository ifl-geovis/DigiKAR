import getElectoralSaxonyData from "@/lib/getElectoralSaxonyData";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getElectoralSaxonyData();
  return NextResponse.json({ data });
}
