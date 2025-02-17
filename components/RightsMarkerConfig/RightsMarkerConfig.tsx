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

const RightsMarkerConfig: FC = () => {
  const { isMultivariate } = useRightsExplorerContext();
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
              verändern. Passe an, welche Rechte angezeigt werden, indem du auf
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
                      tooltipContent="Help"
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
          <p>Welches Recht möchtest du in der Karte darstellen?</p>
        </div>
      )}
    </Card>
  );
};

export default RightsMarkerConfig;
