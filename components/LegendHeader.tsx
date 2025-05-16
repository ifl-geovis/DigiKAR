"use client";

import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";

const LegendHeader = () => {
  const { selectedLegendItems } = useRightsExplorerContext();
  return (
    <div className="flex items-baseline gap-2">
      <span>Legende</span>
      {selectedLegendItems.length > 0 && (
        <span className="monospace text-muted-foreground font-normal">
          <span className="bg-muted mr-2 inline-block aspect-square w-[1.5em] rounded-full text-center">
            {selectedLegendItems.length}
          </span>
          ausgewählt
        </span>
      )}
    </div>
  );
};

export default LegendHeader;
