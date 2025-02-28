import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { range } from "d3";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import { useMapStateContext } from "./MapState/MapStateContext";
import { RxExclamationTriangle } from "react-icons/rx";
import Tooltip from "./Tooltip";
import TooltipTrigger from "./Tooltip/TooltipTrigger";
import TooltipContent from "./Tooltip/TooltipContent";

const MultivariatToggle = () => {
  const { isMultivariate, setIsMultivariate } = useRightsExplorerContext();
  const { viewState } = useMapStateContext();

  const rays = 5;
  return (
    <div className="mb-2 flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Label>Einzelrecht</Label>
        <svg width={10} height={10}>
          <circle className="fill-slate-500" cx={5} cy={5} r={1} />
          <circle className="fill-none stroke-slate-500" cx={5} cy={5} r={4} />
        </svg>
      </div>
      <Switch checked={isMultivariate} onCheckedChange={setIsMultivariate} />
      <div className="flex items-center gap-1">
        <svg width={10} height={10}>
          {range(5).map((i) => (
            <g
              key={i}
              transform={`translate(5, 5) rotate(${(360 / rays) * i})`}
            >
              <line className="stroke-slate-500" y2={-4} />
              <circle className="fill-slate-500" cy={-4} r={1} />
            </g>
          ))}
        </svg>
        <Label>Kombination</Label>
      </div>
      {viewState.zoom < 10 && isMultivariate && (
        <Tooltip>
          <TooltipTrigger>
            <div className="rounded-full bg-yellow-300 p-1">
              <RxExclamationTriangle className="text-yellow-800" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-primary text-sm text-white">
            In geringen Zoomstufe ist die Einzelrecht-Ansicht empfohlen.
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default MultivariatToggle;
