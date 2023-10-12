import getElectoralSaxonyData from "@/app/lib/getElectoralSaxonyData";

export async function GET() {
  const data = await getElectoralSaxonyData();
  return Response.json({ data });
}
