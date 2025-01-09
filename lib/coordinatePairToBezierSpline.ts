import { lineString } from "@turf/helpers";
import { Position, LineString, Feature, GeoJsonProperties } from "geojson";
import length from "@turf/length";
import midpoint from "@turf/midpoint";
import bearing from "@turf/bearing";
import destination from "@turf/destination";
import bezierSpline from "@turf/bezier-spline";
import booleanIntersects from "@turf/boolean-intersects";
import { point } from "@turf/helpers";
import buffer from "@turf/buffer";
import polygonToLine from "@turf/polygon-to-line";

const abcToBezierCoordinates = (abc: [Position, Position, Position]) => {
  return bezierSpline(lineString(abc)).geometry.coordinates;
};

const getControllPoint = (start: Position, end: Position, offset?: number) => {
  const distance = length(lineString([start, end]), { units: "kilometers" });
  const m = midpoint(start, end);
  const b = bearing(start, end);
  const cp = destination(m, offset ?? distance / 6, b + 90, {
    units: "kilometers",
  });
  return cp;
};

const coordinatePairToBezierSpline = (
  pair: [Position, Position],
): LineString["coordinates"] => {
  const [start, end] = pair;

  // checks whether the flow is a closed loop (same start and end point)
  const isClosedLoop = booleanIntersects(point(start), point(end));

  // draw simple bended line for open loops
  if (!isClosedLoop) {
    const cp = getControllPoint(start, end);
    return abcToBezierCoordinates([start, cp.geometry.coordinates, end]);
  }
  // draw a circle-like thing for closed loops
  else {
    const radius = 10;
    const buffered = buffer(point(start), radius, {
      units: "kilometers",
      steps: 64,
    });
    if (!buffered) return [];
    const line = polygonToLine(buffered) as Feature<
      LineString,
      GeoJsonProperties
    >;
    const coordinates = line.geometry.coordinates;
    const cp1 = getControllPoint(coordinates[0], coordinates[9], -2);
    // TODO: improve typing: avoid type assertion for positions
    const cp2 = getControllPoint(
      coordinates.at(-9) as Position,
      coordinates.at(-1) as Position,
      -2,
    );
    return [
      ...abcToBezierCoordinates([
        start,
        cp1.geometry.coordinates,
        coordinates[9],
      ]),
      ...line.geometry.coordinates.slice(9, -11),
      ...abcToBezierCoordinates([
        coordinates.at(-9) as Position,
        cp2.geometry.coordinates,
        end,
      ]),
    ];
  }
};

export default coordinatePairToBezierSpline;
