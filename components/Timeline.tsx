"use client";

import { scaleLinear } from "d3";
import { FC } from "react";
import useMeasure from "react-use-measure";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import TimelineBrush from "./TimelineBrush";

const height = 40;
const margin = 10;

const Timeline: FC = () => {
  const [ref, { width }] = useMeasure();
  const { timeRange } = useRightsExplorerContext();
  const domainX = [1450, 1850];
  const scaleX = scaleLinear()
    .domain(domainX)
    .range([35, width - margin]);
  return (
    <div className="rounded-sm bg-white p-2 shadow-xl">
      <div ref={ref}>
        <svg className="rounded bg-gray-100" width={width} height={height}>
          <g>
            {scaleX.ticks().map((d: number) => (
              <g key={d} transform={`translate(${scaleX(d)} 0)`}>
                <line y2={height - margin - 10} stroke="lightgrey" />
                <text
                  fill="lightgrey"
                  textAnchor="middle"
                  y={height - 5}
                  fontSize={12}
                >
                  {d}
                </text>
              </g>
            ))}
          </g>
          <TimelineBrush
            timeRange={timeRange}
            scaleX={scaleX}
            height={height - 2 * margin}
          />
        </svg>
      </div>
    </div>
  );
};

export default Timeline;
