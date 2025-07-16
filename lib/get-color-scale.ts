import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";
import { ColorScales } from "@/types/ColorMaps";

export const getColorScale = (
  colorScales: ColorScales,
  perspective: Perspective,
  showIndividuals: boolean,
) => {
  const colorScale = colorScales.find(
    (scale) =>
      scale.perspective === perspective &&
      (showIndividuals ? scale.type === "Person" : scale.type !== "Person"),
  )?.scale;

  return colorScale;
};
