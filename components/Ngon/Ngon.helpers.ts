import { range } from "d3";

/**
 * Get points which make up a regular n-gon (regular n-sided polygon).
 * @param radius The n-gon's radius.
 * @param sides Number of the n-gon's sides.
 * @param startAngle Angle of the first vertex, relative to a vertical line through the center of the n-gon position for the first vertex.
 * @returns An array of objects, with x- and y-coordinates, with all vertices of the n-gon in clockwise order.
 */
export const getNgonPoints = (
  radius: number,
  sides: number,
  startAngle = 0
) => {
  const stepSize = (2 * Math.PI) / sides;
  const offset = startAngle + Math.PI / -2;
  return range(0, sides).map((_, idx) => {
    const angle = offset + stepSize * idx;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  });
};
