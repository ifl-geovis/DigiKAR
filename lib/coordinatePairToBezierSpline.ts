import { lineString } from "@turf/helpers";
import { Position, LineString } from "geojson";
import length from "@turf/length";
import midpoint from "@turf/midpoint";
import bearing from "@turf/bearing";
import destination from "@turf/destination";
import bezierSpline from "@turf/bezier-spline";

const coordinatePairToBezierSpline = (
  pair: [Position, Position],
): LineString["coordinates"] => {
  const [start, end] = pair;
  const distance = length(lineString([start, end]), { units: "kilometers" });
  const m = midpoint(start, end);
  const b = bearing(start, end);
  const cp = destination(m, distance / 6, b + 90, {
    units: "kilometers",
  });

  const coordinates = bezierSpline(
    lineString([start, cp.geometry.coordinates, end]),
  ).geometry.coordinates;
  return coordinates;
};

export default coordinatePairToBezierSpline;
