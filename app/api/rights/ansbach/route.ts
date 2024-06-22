import { loadAnsbachData } from "@/lib/loadAnsbachData";
import { Bbox } from "@/types/Bbox";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const bboxRaw = request.nextUrl.searchParams.get("bbox");
  const bbox = bboxRaw?.replace(/{|}/g, "").split(",").map(Number) as Bbox;
  const data = await loadAnsbachData(bbox);
  return NextResponse.json(data);
}
