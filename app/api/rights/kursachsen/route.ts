import getElectoralSaxonyData from "@/lib/getElectoralSaxonyData";

export async function GET() {
  const data = await getElectoralSaxonyData();
  return Response.json({ data });
}
