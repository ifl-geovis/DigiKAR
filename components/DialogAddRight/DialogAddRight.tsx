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

const RightIndicator: FC = () => {
  const { order, uniqueSet, setOrder } = useRightsExplorerContext();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Show or hide Right</DialogTitle>
        <DialogDescription>
          <p>
            Configure which rights from the data you would like to see in the
            map.
          </p>
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
                <Button
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
                </Button>
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
