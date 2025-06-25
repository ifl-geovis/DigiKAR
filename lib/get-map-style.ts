import { promises as fs } from "fs";
import { StyleSpecification } from "maplibre-gl";

export const getMapStyle = async (workingPackage: "rights" | "mobility") => {
  const file = await fs.readFile("lib/digikar-style.json", "utf-8");
  const style = (await JSON.parse(file)) as StyleSpecification;
  if (workingPackage === "rights") {
    //Remove layers orteMainz orteMainzLabels
    style.layers = style.layers.filter(
      (layer) => layer.id !== "orteMainz" && layer.id !== "orteMainzLabels",
    );
  }
  return style;
};
