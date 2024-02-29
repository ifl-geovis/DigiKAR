"use client";

import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";

const LegendNominal = () => {
  const { colorScale } = useRightsExplorerContext();
  return (
    <ol>
      {colorScale.domain().map((d) => (
        <li key={d} className="flex items-center">
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
