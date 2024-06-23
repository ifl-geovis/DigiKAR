import { FC } from "react";
import { TimeRange } from "./RightsExplorer/RightsExplorerContext";
import { ScaleLinear, range } from "d3";

type Props = {
  scaleX: ScaleLinear<number, number>;
  timeRange: TimeRange;
  height: number;
};

const TimelineBrush: FC<Props> = ({ scaleX, timeRange, height }) => {
  const tmin = timeRange.t - timeRange.support;
  const tmax = timeRange.t + timeRange.support;
  return (
    <g transform={`translate(${scaleX(timeRange.t)} 1)`}>
      <rect
        x={scaleX(tmin) - scaleX(timeRange.t)}
        y={2}
        width={scaleX(tmax) - scaleX(tmin)}
        height={height - 3}
        fill="none"
        stroke="darkgrey"
        rx={2}
      />
      <line y2={height} stroke="black" strokeWidth={4} />
      <Handle height={20} timelineHeight={height} />
    </g>
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
