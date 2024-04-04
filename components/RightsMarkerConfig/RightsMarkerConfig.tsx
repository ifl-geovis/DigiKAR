"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FC } from "react";
import { RxMixerVertical, RxQuestionMark } from "react-icons/rx";
import DialogAddRight from "../DialogAddRight";
import { Button } from "../ui/button";
import SnowflakePreview from "../SnowflakePreview";
import DialogHelpSymbol from "../DialogHelpSymbol";
import ButtonWithTooltip from "../ButtonWithTooltip";

const RightsMarkerConfig: FC = () => {
  return (
    <div className="flex gap-4 rounded bg-white p-2 text-xs shadow">
      <SnowflakePreview />
      <div className="flex flex-col gap-2">
        <p>
          Click on a right to change its order and its symbol. Customize which
          rights are displayed by clicking on the button.
        </p>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <RxMixerVertical className="mr-2" /> Appearance
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
  );
};

export default RightsMarkerConfig;
