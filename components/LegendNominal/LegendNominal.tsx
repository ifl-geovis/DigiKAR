"use client";

import { twJoin } from "tailwind-merge";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { useMapStateContext } from "../MapState/MapStateContext";

const LegendNominal = () => {
  const { viewState } = useMapStateContext();
  const { colorScale, setActiveCategory, activeCategory } =
    useRightsExplorerContext();
  if (viewState.zoom < 10) return <p>Zoom in to see a legend</p>;
  return (
    <>
      <ol className="flex flex-col gap-2">
        {colorScale.domain().map((d) => (
          <li
            key={d}
            className={twJoin(
              "flex cursor-pointer items-center gap-1 leading-tight transition-opacity",
              activeCategory === d && "font-bold",
              activeCategory && activeCategory !== d && "opacity-30",
            )}
            onClick={() =>
              setActiveCategory((prevState?: string) =>
                prevState !== d ? d : undefined,
              )
            }
          >
            <svg width={16} height={16} className="shrink-0">
              <circle
                cx={8}
                cy={8}
                r={6.6}
                stroke="black"
                fill={colorScale(d)}
              />
            </svg>
            <div>{d}</div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default LegendNominal;
