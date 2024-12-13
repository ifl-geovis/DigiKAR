import { FC, useCallback } from "react";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import { ScaleLinear, range, schemeObservable10 } from "d3";
import { Drag } from "@visx/drag";
import { HandlerArgs } from "@visx/drag/lib/Drag";

type Props = {
  scaleX: ScaleLinear<number, number>;
  height: number;
};

const TimelineBrush: FC<Props> = ({ scaleX, height }) => {
  const { timeRange, setTimeRange } = useRightsExplorerContext();
  const { min, max, t } = timeRange;
  const width = scaleX.range()[1];

  const onDragEnd = useCallback(
    (currentDrag: HandlerArgs) => {
      console.log({ currentDrag, setTimeRange });
      // setTimeRange((prev: TimeRange) => ({
      //   ...prev,
      //   [d]: currentDrag.x,
      // }));
    },
    [setTimeRange],
  );
  return (
    <div>
      <svg width={width} height={height}>
        {[min, t, max].map((d, i) => (
          <Drag
            key={`brush-${i}`}
            width={width}
            height={height}
            restrict={{ yMax: height / 2, yMin: height / 2 }}
            x={scaleX(d)}
            y={height / 2}
            onDragEnd={onDragEnd}
          >
            {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx }) => (
              <circle
                cx={x}
                cy={y}
                transform={`translate(${dx}, ${0})`}
                r={height / 2}
                fill={schemeObservable10[i]}
                stroke="black"
                strokeWidth={isDragging ? 2 : 0}
                onMouseMove={dragMove}
                onMouseUp={dragEnd}
                onMouseDown={dragStart}
                onTouchStart={dragStart}
                onTouchMove={dragMove}
                onTouchEnd={dragEnd}
              />
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
