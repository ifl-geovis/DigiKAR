"use client";

import { twJoin } from "tailwind-merge";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";

const LegendNominal = () => {
  const { colorScale, setActiveCategory, activeCategory } =
    useRightsExplorerContext();
  return (
    <ol>
      {colorScale.domain().map((d) => (
        <li
          key={d}
          className={twJoin(
            "flex cursor-pointer items-center transition-opacity",
            activeCategory === d && "font-bold",
            activeCategory && activeCategory !== d && "opacity-30",
          )}
          onClick={() =>
            setActiveCategory((prevState?: string) =>
              prevState !== d ? d : undefined,
            )
          }
        >
          <svg width={"1em"} height={"1em"} className="mr-3 inline">
            <circle cx={".5em"} cy={".5em"} r={".5em"} fill={colorScale(d)} />
          </svg>
          <div>{d}</div>
        </li>
      ))}
    </ol>
  );
};

export default LegendNominal;
