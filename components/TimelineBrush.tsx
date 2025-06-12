import { FC, useCallback, useState } from "react";
import {
  TimeRange,
  TimeRangeHandle,
  useRightsExplorerContext,
} from "./RightsExplorer/RightsExplorerContext";
import { ScaleLinear, range } from "d3";
import { Drag, raise } from "@visx/drag";
import { HandlerArgs } from "@visx/drag/lib/Drag";
import { Line, Polygon } from "@visx/shape";
import { PatternLines } from "@visx/pattern";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  scaleX: ScaleLinear<number, number>;
  height: number;
  width: number;
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

const TimelineBrush: FC<Props> = ({ scaleX, width, height }) => {
  const handleHeight = height / 2;

  const { timeRange, setTimeRange } = useRightsExplorerContext();

  const [handles, setHandles] = useState(timeRange);

  const onDragEnd = useCallback(
    (currentDrag: HandlerArgs, handle: TimeRangeHandle) => {
      setTimeRange((prev: TimeRange) => ({
        ...prev,
        [handle]: Math.round(
          scaleX.invert((currentDrag.x ?? 0) + currentDrag.dx),
        ),
      }));
    },
    [setTimeRange, scaleX],
  );

  const onDragMove = useCallback(
    (currentDrag: HandlerArgs, handle: TimeRangeHandle) => {
      setHandles((prev) => ({
        ...prev,
        [handle]: Math.round(
          scaleX.invert((currentDrag.x ?? 0) + currentDrag.dx),
        ),
      }));
    },
    [scaleX],
  );

  const handlesEntries = Object.entries(handles) as Entries<typeof timeRange>;

  return (
    <div>
      <svg width={width} height={height}>
        <PatternLines
          id="lines"
          height={5}
          width={5}
          stroke={"lightgrey"}
          strokeWidth={1}
          orientation={["diagonal"]}
        />
        <rect
          x={scaleX(handles.min)}
          y={2}
          width={scaleX(handles.max) - scaleX(handles.min)}
          height={handleHeight - 4}
          fill="url(#lines)"
          stroke="lightgrey"
          rx={2}
        />
        {handlesEntries.map(([handle, value], i) => (
          <Drag
            key={`brush-${handle}`}
            width={width}
            height={height}
            restrict={{
              xMin:
                handle === "t"
                  ? scaleX(timeRange.min + 1)
                  : handle === "max"
                    ? scaleX(timeRange.t + 1)
                    : scaleX(scaleX.domain()[0]),
              xMax:
                handle === "min"
                  ? scaleX(timeRange.t - 1)
                  : handle === "t"
                    ? scaleX(timeRange.max - 1)
                    : scaleX(scaleX.domain()[1]),
              yMin: height / 2,
              yMax: height / 2,
            }}
            x={scaleX(value)}
            y={0}
            onDragStart={() =>
              setHandles(
                Object.fromEntries(raise(handlesEntries, i)) as TimeRange,
              )
            }
            onDragEnd={(currentDrag) => onDragEnd(currentDrag, handle)}
            onDragMove={(currentDrag) => onDragMove(currentDrag, handle)}
          >
            {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx }) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <g
                    className="cursor-col-resize"
                    transform={`translate(${dx}, ${0})`}
                    onMouseMove={dragMove}
                    onMouseUp={dragEnd}
                    onMouseDown={dragStart}
                    onTouchStart={dragStart}
                    onTouchMove={dragMove}
                    onTouchEnd={dragEnd}
                  >
                    <Polygon
                      transform={`translate(${x}, ${handleHeight})`}
                      rotate={-90}
                      sides={3}
                      size={3}
                      fill={isDragging ? "black" : "gray"}
                    />
                    <Line
                      x1={x}
                      x2={x}
                      y2={height - 5}
                      stroke={isDragging ? "black" : "gray"}
                    />
                    <rect
                      x={(x ?? 0) - 20}
                      y={(y ?? 0) + 2}
                      rx={2}
                      height={handleHeight - 4}
                      width={40}
                      fill="white"
                      stroke={isDragging ? "black" : "gray"}
                      strokeWidth={isDragging ? 2 : 1}
                    />
                    <text
                      className="pointer-events-none"
                      dominantBaseline="middle"
                      fontSize={12}
                      x={x}
                      dy={handleHeight / 2}
                      textAnchor="middle"
                    >
                      {handle === "min"
                        ? handles.min - handles.t
                        : handle === "t"
                          ? handles.t
                          : `+${handles.max - handles.t}`}
                    </text>
                  </g>
                </TooltipTrigger>
                <TooltipContent className="p-2">
                  <div className="text-xs font-bold">{handles[handle]}</div>
                </TooltipContent>
              </Tooltip>
            )}
          </Drag>
        ))}
      </svg>
    </div>
  );
};

export default TimelineBrush;

export const Handle: FC<{ height: number; timelineHeight: number }> = ({
  height,
  timelineHeight,
}) => {
  return (
    <g className="cursor-not-allowed">
      <rect
        y={timelineHeight / 2 - height / 2}
        height={height}
        fill={"white"}
        stroke={"black"}
        width={10}
        x={-5}
        rx={4}
      />
      <g transform={`translate(0 ${timelineHeight / 2})`}>
        {range(-1, 2).map((d) => {
          return (
            <line
              x1={-3}
              x2={3}
              y1={d * 3}
              y2={d * 3}
              stroke={"black"}
              key={d}
            />
          );
        })}
      </g>
    </g>
  );
};
