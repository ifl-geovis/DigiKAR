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
import {
  RxCheck,
  RxExclamationTriangle,
  RxEyeClosed,
  RxEyeOpen,
} from "react-icons/rx";
import { twJoin } from "tailwind-merge";
import ButtonWithTooltip from "../ButtonWithTooltip/ButtonWithTooltip";

const RightIndicator: FC = () => {
  const { order, rightSet, setOrder } = useRightsExplorerContext();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Auswahl der Herrschaftsrechte</DialogTitle>
        <DialogDescription>
          Stelle ein, welche Rechte in der Karte dargestellt werden sollen.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div className="my-2">
          {order.length > 5 && (
            <div className="mb-4 flex items-start gap-3 rounded-sm bg-gray-50 p-2">
              <div className="inline-block rounded-full bg-yellow-300 p-1">
                <RxExclamationTriangle className="text-yellow-800" />
              </div>
              <p>
                Aus Gründen der Darstellbarkeit empfehlen wir maximal 5
                Herrschaftsrechte.
              </p>
            </div>
          )}
          {[...rightSet.entries()].map(([relation, { label, shortcode }]) => {
            const isVisualized = order.includes(relation);
            return (
              <div
                className={twJoin(
                  `my-1 flex items-center justify-between gap-3 rounded p-1 px-2 shadow-sm`,
                  !isVisualized && "text-gray-400",
                )}
                key={relation}
              >
                <ButtonWithTooltip
                  tooltipContent="Toggle visibility"
                  onClick={() =>
                    isVisualized
                      ? setOrder([...order.filter((d) => d != relation)])
                      : setOrder([...order, relation])
                  }
                  size={"sm"}
                  variant={"ghost"}
                >
                  {!isVisualized ? <RxEyeClosed /> : <RxEyeOpen />}
                </ButtonWithTooltip>
                <span>{label}</span>
                <div className="mr-2 ml-auto rounded bg-gray-50 p-1 font-mono text-xs font-bold">
                  {shortcode}
                </div>
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
