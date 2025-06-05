"use client";

import { RiResetRightLine } from "react-icons/ri";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import { Button } from "./ui/button";

const LegendHeader = () => {
  const { selectedLegendItems, setSelectedLegendItems } =
    useRightsExplorerContext();
  return (
    <div className="flex w-full items-baseline gap-2">
      <span>Legende</span>
      {selectedLegendItems.length > 0 && (
        <>
          <span className="monospace text-muted-foreground font-normal">
            <span className="bg-muted mr-2 inline-block aspect-square w-[1.5em] rounded-full text-center">
              {selectedLegendItems.length}
            </span>
            ausgewählt
          </span>
          <Button
            variant={"secondary"}
            size={"sm"}
            className="ml-auto cursor-pointer"
            onClick={() => {
              setSelectedLegendItems([]);
            }}
          >
            <RiResetRightLine />
          </Button>
        </>
      )}
    </div>
  );
};

export default LegendHeader;
