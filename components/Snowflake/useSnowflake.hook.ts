import { Attribute, RightWithPerspectives } from "@/types/PlaceProperties";
import { getNgonPoints } from "../Ngon/Ngon.helpers";
import getRightStatus from "@/lib/getRightStatus";

const useSnowflake = (
  placeAttributes: Attribute<RightWithPerspectives>[],
  radius: number,
  circleRadius: number,
  order: string[],
) => {
  const rays = order.length;
  const outerRadius = radius - circleRadius;
  const noDataPoints = getNgonPoints(outerRadius / 2, rays);
  const points = getNgonPoints(outerRadius, rays)
    .flatMap(({ x, y }, i) => {
      const attribute = placeAttributes.find(
        (d) => d.attributeName == order[i],
      );
      if (!attribute) return [];
      const { isWithoutHolder } = getRightStatus(attribute.holders);
      const { attributeName, holders } = attribute;
      const coordinates = !isWithoutHolder
        ? { x, y }
        : { x: noDataPoints[i].x, y: noDataPoints[i].y };
      return [{ ...coordinates, attributeName, holders }];
    })
    .sort(
      (a, b) =>
        (order?.indexOf(a.attributeName) ?? 1) -
        (order?.indexOf(b.attributeName) ?? 1),
    );
  return { outerRadius, points };
};

export default useSnowflake;
