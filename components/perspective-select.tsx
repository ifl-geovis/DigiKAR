"use client";

import { RxQuestionMark } from "react-icons/rx";
import ButtonWithTooltip from "./ButtonWithTooltip";
import {
  Perspective,
  useRightsExplorerContext,
} from "./RightsExplorer/RightsExplorerContext";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DialogHelpPerspective from "./dialog-help-perspective";

const PerspectiveSelect = () => {
  const {
    setPerspective,
    perspective,
    setSelectedLegendItems,
    setShowIndividuals,
  } = useRightsExplorerContext();
  return (
    <div>
      <Label>Herrschaftsträger</Label>
      <div className="flex gap-2">
        <Select
          defaultValue={perspective}
          onValueChange={(value: Perspective) => {
            setPerspective(value);
            setShowIndividuals(false);
            setSelectedLegendItems([]);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Wähle ein Art von Herrschaftsträgern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="categories">kategorisiert</SelectItem>
            <SelectItem value="individuals">normalisiert</SelectItem>
            <SelectItem value="topLevels">übergeordnet</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <ButtonWithTooltip
                tooltipContent="Hilfe"
                variant={"ghost"}
                size={"icon"}
              >
                <RxQuestionMark />
              </ButtonWithTooltip>
            </div>
          </DialogTrigger>
          <DialogHelpPerspective />
        </Dialog>
      </div>
    </div>
  );
};

export default PerspectiveSelect;
