import { Attribute } from "@/types/PlaceProperties";
import { getNgonPoints } from "../Ngon/Ngon.helpers";

const useSnowflake = (
  placeAttributes: Attribute[],
  radius: number,
  circleRadius: number,
  order?: string[],
) => {
  const rays = placeAttributes.length;
  const outerRadius = radius - circleRadius;
  const points = getNgonPoints(outerRadius, rays)
    .map(({ x, y }, i) => {
      const { attributeName, holders } = placeAttributes[i];
      return { x, y, attributeName, holders };
    })
    .sort(
      (a, b) =>
        (order?.indexOf(a.attributeName) ?? 1) -
        (order?.indexOf(b.attributeName) ?? 1),
    );
  return { outerRadius, points };
};

export default useSnowflake;
