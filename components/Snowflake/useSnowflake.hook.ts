import { Attribute, HoldersGeneralized } from "@/types/PlaceProperties";
import { getNgonPoints } from "../Ngon/Ngon.helpers";

const useSnowflake = (
  placeAttributes: Attribute<HoldersGeneralized>[],
  radius: number,
  circleRadius: number,
  order: string[],
) => {
  const rays = order.length;
  const outerRadius = radius - circleRadius;
  const points = getNgonPoints(outerRadius, rays)
    .flatMap(({ x, y }, i) => {
      const attribute = placeAttributes.find(
        (d) => d.attributeName == order[i],
      );
      if (!attribute) return [];
      const { attributeName, holders } = attribute;
      return [{ x, y, attributeName, holders }];
    })
    .sort(
      (a, b) =>
        (order?.indexOf(a.attributeName) ?? 1) -
        (order?.indexOf(b.attributeName) ?? 1),
    );
  return { outerRadius, points };
};

export default useSnowflake;
