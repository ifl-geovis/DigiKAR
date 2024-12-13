"use client";

import { scaleLinear } from "d3";
import { FC } from "react";
import useMeasure from "react-use-measure";
import TimelineBrush from "./TimelineBrush";

const height = 40;
const margin = 10;

const Timeline: FC = () => {
  const [ref, { width }] = useMeasure();
  const domainX = [1450, 1850];
  const scaleX = scaleLinear()
    .domain(domainX)
    .range([35, width - margin]);
  return (
    <div className="rounded-sm bg-white p-2 shadow-xl">
      <div ref={ref} className="grid grid-cols-1 grid-rows-1">
        <svg
          className="col-start-1 row-start-1 rounded bg-gray-100"
          width={width}
          height={height}
        >
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
        </svg>
        <div className="col-start-1 row-start-1">
          <TimelineBrush scaleX={scaleX} height={height - 2 * margin} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
