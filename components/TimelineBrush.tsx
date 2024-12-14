import { FC, useCallback, useState } from "react";
import {
  TimeRange,
  TimeRangeHandle,
  useRightsExplorerContext,
} from "./RightsExplorer/RightsExplorerContext";
import { ScaleLinear, range } from "d3";
import { Drag, raise } from "@visx/drag";
import { HandlerArgs } from "@visx/drag/lib/Drag";

type Props = {
  scaleX: ScaleLinear<number, number>;
  height: number;
};

const TimelineBrush: FC<Props> = ({ scaleX, height }) => {
  const width = scaleX.range()[1];
  const handleHeight = height / 2;

  const { timeRange, setTimeRange } = useRightsExplorerContext();

  const [handlers, setHandles] = useState(
    Object.entries(timeRange) as [TimeRangeHandle, number][],
  );

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
      setHandles((prev) => [
        ...prev.filter((d) => d[0] !== handle),
        [
          handle,
          Math.round(scaleX.invert((currentDrag.x ?? 0) + currentDrag.dx)),
        ],
      ]);
    },
    [scaleX],
  );

  const brushWidth =
    scaleX(handlers?.find(([key]) => key === "max")?.[1] ?? 1) -
    scaleX(handlers?.find(([key]) => key === "min")?.[1] ?? 1);
  const brushX = scaleX(handlers?.find(([key]) => key === "min")?.[1] ?? 0);
  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={brushX}
          y={2}
          width={brushWidth}
          height={handleHeight - 4}
          fill="none"
          stroke="darkgrey"
          rx={2}
        />
        {handlers.map(([handle, value], i) => (
          <Drag
            key={`brush-${handle}`}
            width={width}
            height={height}
            restrict={{ yMax: height / 2, yMin: height / 2 }}
            x={scaleX(value)}
            y={0}
            onDragStart={() => setHandles(raise(handlers, i))}
            onDragEnd={(currentDrag) => onDragEnd(currentDrag, handle)}
            onDragMove={(currentDrag) => onDragMove(currentDrag, handle)}
          >
            {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx }) => (
              <g
                className="cursor-grab"
                transform={`translate(${dx}, ${0})`}
                onMouseMove={dragMove}
                onMouseUp={dragEnd}
                onMouseDown={dragStart}
                onTouchStart={dragStart}
                onTouchMove={dragMove}
                onTouchEnd={dragEnd}
              >
                <rect
                  x={(x ?? 0) - 15}
                  y={(y ?? 0) + 2}
                  rx={3}
                  height={handleHeight - 4}
                  width={30}
                  fill="white"
                  stroke={isDragging ? "black" : "gray"}
                  strokeWidth={2}
                />
                <text
                  className="pointer-events-none"
                  dominantBaseline="middle"
                  fontSize={9}
                  x={x}
                  dy={handleHeight / 2}
                  textAnchor="middle"
                >
                  {handle}
                </text>
              </g>
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
