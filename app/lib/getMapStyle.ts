import { promises as fs } from "fs";
import { StyleSpecification } from "maplibre-gl";

export const getMapStyle = async () => {
  const file = await fs.readFile("app/lib/mapStyle.json", "utf-8");
  const style = (await JSON.parse(file)) as StyleSpecification;
  return style;
};
