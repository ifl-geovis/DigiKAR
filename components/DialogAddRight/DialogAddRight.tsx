import { FC } from "react";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RxCheck, RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { twJoin } from "tailwind-merge";
import ButtonWithTooltip from "../ButtonWithTooltip/ButtonWithTooltip";
import { capitalize } from "@/lib/utils";

const RightIndicator: FC = () => {
  const { order, attributeSet, setOrder } = useRightsExplorerContext();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Passe das Symbol an</DialogTitle>
        <DialogDescription>
          Stelle ein wie die Rechte in der Karte dargestellt werden sollen. Du
          kannst die Reihenfolge und die Form der Rechte anpassen.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="my-2">
          {Array.from(attributeSet.values()).map((right) => {
            const isVisualized = order.includes(right);
            return (
              <div
                className={twJoin(
                  `my-1 flex items-center justify-between rounded p-1 px-2 shadow`,
                  !isVisualized && "text-gray-400",
                )}
                key={right}
              >
                {capitalize(right)}
                <ButtonWithTooltip
                  tooltipContent="Toggle visibility"
                  // disabled={!isVisualized}
                  onClick={() =>
                    isVisualized
                      ? setOrder([...order.filter((d) => d != right)])
                      : setOrder([...order, right])
                  }
                  size={"sm"}
                  variant={"ghost"}
                >
                  {!isVisualized ? <RxEyeClosed /> : <RxEyeOpen />}
                </ButtonWithTooltip>
              </div>
            );
          })}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button>
            <RxCheck className="mr-2" /> OK
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default RightIndicator;
