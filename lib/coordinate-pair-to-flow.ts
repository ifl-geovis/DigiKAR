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

const getControllPoint = (
  start: Position,
  end: Position,
  offset?: number,
  _options: { considerDistance?: boolean } = {},
) => {
  const options = {
    considerDistance: false,
    ..._options,
  };
  const distance = length(lineString([start, end]), { units: "kilometers" });
  const cpDistance = options.considerDistance
    ? (distance / 6) * 1 + (offset ?? 0) ** 1.5
    : (offset ?? 1);
  const m = midpoint(start, end);
  const b = bearing(start, end);
  const cp = destination(m, cpDistance, b + 90, {
    units: "kilometers",
  });
  return cp;
};

const coordinatePairToFlow = (
  pair: [Position, Position],
  bend: number = 1,
): LineString["coordinates"] => {
  const [start, end] = pair;

  // checks whether the flow is a closed loop (same start and end point)
  const isClosedLoop = booleanIntersects(point(start), point(end));

  // draw simple bended line for open loops
  if (!isClosedLoop) {
    const cp = getControllPoint(start, end, 1 + bend, {
      considerDistance: true,
    });
    return abcToBezierCoordinates([start, cp.geometry.coordinates, end]);
  }
  // draw a circle-like thing for closed loops
  else {
    const radius = 3 * (1 + bend);
    const steps = 64;
    const buffered = buffer(point(start), radius, {
      units: "kilometers",
      steps,
    });
    if (!buffered) return [];
    const line = polygonToLine(buffered) as Feature<
      LineString,
      GeoJsonProperties
    >;
    const coordinates = line.geometry.coordinates;
    const offset = Math.floor(steps / 2);
    const cp1 = getControllPoint(
      coordinates[0],
      coordinates[offset],
      radius / -8,
    );
    // TODO: improve typing: avoid type assertion for positions
    const cp2 = getControllPoint(
      coordinates.at(-offset) as Position,
      coordinates.at(-1) as Position,
      radius / -8,
    );
    return [
      ...abcToBezierCoordinates([
        start,
        cp1.geometry.coordinates,
        coordinates[offset],
      ]),
      ...line.geometry.coordinates.slice(offset, -offset - 2),
      ...abcToBezierCoordinates([
        coordinates.at(-offset) as Position,
        cp2.geometry.coordinates,
        end,
      ]),
    ];
  }
};

export default coordinatePairToFlow;
