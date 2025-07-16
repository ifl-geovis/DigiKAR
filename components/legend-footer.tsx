"use client";

import { Separator } from "./ui/separator";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import { Button } from "./ui/button";
import { RxCursorArrow, RxReset, RxTextAlignMiddle } from "react-icons/rx";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { getColorScale } from "@/lib/get-color-scale";

const LegendFooter = () => {
  const {
    colorScales,
    onlyShowInView,
    perspective,
    selectedLegendItems,
    setOnlyShowInView,
    setSelectedLegendItems,
    showIndividuals,
  } = useRightsExplorerContext();
  const colorScale = getColorScale(colorScales, perspective, showIndividuals);
  const totalItems = colorScale?.domain().length ?? 0;
  return (
    <div className="flex h-10 w-full items-center gap-3 border-t px-4 py-2">
      <div className="flex w-full items-center gap-2">
        <RxCursorArrow />
        <span className="text-muted-foreground font-mono text-sm font-normal">
          <span className="font-bold">{selectedLegendItems.length}</span>
          <span> / {totalItems}</span> ausgewählt
        </span>
        {selectedLegendItems.length > 0 && (
          <Button
            variant={"secondary"}
            size={"xs"}
            className="ml-auto"
            onClick={() => {
              setSelectedLegendItems([]);
            }}
          >
            <RxReset />
          </Button>
        )}
      </div>
      <Separator orientation="vertical" className="h-6" />
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <RxTextAlignMiddle />
            <Switch
              checked={onlyShowInView}
              onCheckedChange={setOnlyShowInView}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-primary max-w-32 p-2 text-xs text-white">
          Zeige nur Legendeeinträge für aktuellen Kartenausschnitt.
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default LegendFooter;
