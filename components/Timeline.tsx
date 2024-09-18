"use client";

import fetcher from "@/lib/fetcher";
import { extent, scaleBand, scaleLinear, scaleSqrt } from "d3";
import { FC } from "react";
import useMeasure from "react-use-measure";
import useSWRImmutable from "swr/immutable";
import Spinner from "./Spinner";
import { Skeleton } from "./ui/skeleton";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import TimelineBrush from "./TimelineBrush";

type TimelineData = { jahr: number; count: number; right_type: string };

const height = 100;
const margin = 15;

const Timeline: FC = () => {
  const [ref, { width }] = useMeasure();
  const { data, isLoading, error } = useSWRImmutable<{ data: TimelineData[] }>(
    "/api/rights/timeline",
    fetcher,
  );
  const { timeRange } = useRightsExplorerContext();
  const domainY =
    data && new Set(data.data.map((d: TimelineData) => d.right_type));
  const scaleY =
    data &&
    domainY &&
    scaleBand()
      .domain(Array.from(domainY))
      .range([margin, height - margin]);
  const domainX =
    data && extent(data.data.map((d: TimelineData) => d.jahr) ?? [0, 1]);
  const scaleX =
    data &&
    domainX &&
    scaleLinear()
      //@ts-expect-error - TS doesn't know that domainX is always [number, number]
      .domain(domainX)
      .range([35, width - margin]);
  const scaleR =
    data &&
    scaleSqrt()
      //@ts-expect-error - TS doesn't know that domainR is always [number, number]
      .domain(extent(data.data.map((d: TimelineData) => d.count)))
      .range([1, 20]);
  return (
    <div className="rounded-sm bg-white p-2 shadow-xl">
      <div ref={ref}>
        {isLoading && (
          <Skeleton
            style={{ minHeight: height }}
            className="flex w-full items-center justify-center"
          >
            <Spinner />
          </Skeleton>
        )}
        {error && <div>Error!</div>}
        {data && scaleX && scaleY && scaleR && (
          <svg className="rounded bg-gray-100" width={width} height={height}>
            <g>
              {scaleX.ticks().map((d: number) => (
                <g key={d} transform={`translate(${scaleX(d)} 0)`}>
                  <line y2={height - margin - 10} stroke="lightgrey" />
                  <text
                    fill="lightgrey"
                    textAnchor="middle"
                    y={height - 10}
                    fontSize={12}
                  >
                    {d}
                  </text>
                </g>
              ))}
            </g>
            {scaleY.domain().map((d: string) => (
              <text
                x={10}
                fontSize={12}
                y={scaleY(d)}
                dominantBaseline="middle"
                key={d}
              >
                {d.slice(0, 1)}
              </text>
            ))}
            {data.data.map((d: TimelineData, i: number) => (
              <circle
                key={i}
                cx={scaleX(d.jahr)}
                cy={scaleY(d.right_type)}
                r={scaleR(d.count)}
                opacity={0.5}
              />
            ))}
            <TimelineBrush
              timeRange={timeRange}
              scaleX={scaleX}
              height={height - 2 * margin}
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Timeline;
