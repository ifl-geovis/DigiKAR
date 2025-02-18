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
  const { setPerspective, perspective } = useRightsExplorerContext();
  return (
    <div>
      <Label>Perspektive</Label>
      <div className="flex gap-2">
        <Select
          defaultValue={perspective}
          onValueChange={(value: Perspective) => setPerspective(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Wähle einen Eventtype" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="categories">Kategorie</SelectItem>
            <SelectItem value="individuals">Rechteinhaber</SelectItem>
            <SelectItem value="topLevels">
              Übergeordneter Herrschaftsträger
            </SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <ButtonWithTooltip
                tooltipContent="Help"
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
