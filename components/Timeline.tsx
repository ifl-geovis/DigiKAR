"use client";

import { range, scaleLinear } from "d3";
import { FC } from "react";
import useMeasure from "react-use-measure";
import TimelineBrush from "./TimelineBrush";

const height = 40;
const margin = { y: 10, x: 35 };

const Timeline: FC = () => {
  const [ref, { width }] = useMeasure();
  const domainX = [1450, 1850] as [number, number];
  const scaleX = scaleLinear()
    .domain(domainX)
    .range([margin.x, width - margin.x]);
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
                <line y2={height - margin.y - 10} stroke="gray" />
                <text
                  fill="gray"
                  textAnchor="middle"
                  y={height - 5}
                  fontSize={12}
                >
                  {d}
                </text>
              </g>
            ))}
            {range(...domainX).map((d) => (
              <line
                key={d}
                transform={`translate(${scaleX(d)} ${height - margin.y - 12})`}
                y2={d % 10 === 0 ? -10 : d % 5 === 0 ? -5 : -2}
                stroke="gray"
              />
            ))}
          </g>
        </svg>
        <div className="col-start-1 row-start-1">
          <TimelineBrush scaleX={scaleX} width={width} height={height} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
