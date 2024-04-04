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

const RightIndicator: FC = () => {
  const { order, uniqueSet, setOrder } = useRightsExplorerContext();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adjust the symbol</DialogTitle>
        <DialogDescription>
          Configure which rights from the data you would like to see in the map.
          You can further customize their order and define a certain shape of
          per right.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="my-2">
          {Array.from(uniqueSet.values()).map((right) => {
            const isVisualized = order.includes(right);
            return (
              <div
                className={twJoin(
                  `my-1 flex items-center justify-between rounded p-1 px-2 shadow`,
                  !isVisualized && "text-gray-400",
                )}
                key={right}
              >
                {right}
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
            <RxCheck className="mr-2" /> Done
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default RightIndicator;
