"use client";

import ButtonWithTooltip from "@/components/ButtonWithTooltip";
import Card from "@/components/Card";
import DialogAddRight from "@/components/DialogAddRight";
import DialogHelpSymbol from "@/components/DialogHelpSymbol";
import SnowflakePreview from "@/components/SnowflakePreview";
import MultivariateToggle from "@/components/multivariate-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FC } from "react";
import { RxMixerVertical, RxQuestionMark } from "react-icons/rx";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { Label } from "../ui/label";
import { Right } from "@/types/PlaceProperties";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { rights } from "@/lib/right-set";

const RightsMarkerConfig: FC = () => {
  const { isMultivariate, univariateRight, setUnivariateRight } =
    useRightsExplorerContext();
  return (
    <Card>
      <div>
        <MultivariateToggle />
      </div>
      {isMultivariate && (
        <div className="flex gap-4 text-xs">
          <SnowflakePreview />
          <div className="flex flex-col gap-2">
            <p>
              Klicke auf ein Recht, um seine Reihenfolge und das Symbol zu
              verändern. Passe an, welche Rechte angezeigt werden, indem Sie auf
              den Button klickst.
            </p>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <RxMixerVertical className="mr-2" />
                    Symbol ändern
                  </Button>
                </DialogTrigger>
                <DialogAddRight />
              </Dialog>
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
                <DialogHelpSymbol />
              </Dialog>
            </div>
          </div>
        </div>
      )}
      {!isMultivariate && (
        <div>
          <Label>Angezeigtes Recht</Label>
          <Select
            defaultValue={univariateRight}
            onValueChange={(value) => setUnivariateRight(value as Right)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wähle ein Recht" />
            </SelectTrigger>
            <SelectContent>
              {rights.map(({ label, relation }) => (
                <SelectItem key={relation} value={relation}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </Card>
  );
};

export default RightsMarkerConfig;
