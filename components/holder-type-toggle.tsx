"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";

const HolderTypeToggle = () => {
  const { showIndividuals, setShowIndividuals, perspective } =
    useRightsExplorerContext();

  return perspective === "individuals" ? (
    <div className="mb-2 flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Label>Körperschaft</Label>
      </div>
      <Switch checked={showIndividuals} onCheckedChange={setShowIndividuals} />
      <div className="flex items-center gap-1">
        <Label>Person</Label>
      </div>
    </div>
  ) : null;
};

export default HolderTypeToggle;
