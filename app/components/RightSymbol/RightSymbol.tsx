import { SpaceEstablishingAttribute } from "@/app/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, useMemo } from "react";
import LocationAttributeCard from "../LocationAttributeCard";
import Tooltip from "../Tooltip";
import TooltipContent from "../Tooltip/TooltipContent";
import TooltipTrigger from "../Tooltip/TooltipTrigger";
import * as Popover from "@radix-ui/react-popover";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";

type Props = {
  x: number;
  y: number;
  attribute: SpaceEstablishingAttribute;
  placeName: string;
  circleRadius: number;
  activeCategory?: string;
  colorScale: ScaleOrdinal<string, string, string>;
  toggleFocus: (newFocus: string, activeCategory?: string) => void;
};

const RightCircle: FC<Props> = ({
  x,
  y,
  attribute,
  placeName,
  circleRadius,
  activeCategory,
  colorScale,
  toggleFocus,
}) => {
  const { isWithoutHolder, isShared, color } = useMemo(() => {
    const isWithoutHolder = attribute.values.length === 0;
    const isShared = attribute.values.length > 1;
    const color = isWithoutHolder
      ? "black"
      : isShared
      ? "white"
      : colorScale(attribute.values[0].holderConsolidated ?? "");
    return { isWithoutHolder, isShared, color };
  }, [attribute, colorScale]);
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <g className="group">
          <Tooltip>
            <TooltipTrigger asChild>
              <g transform={`translate(${x} ${y})`}>
                <circle
                  r={isWithoutHolder ? circleRadius / 4 : circleRadius}
                  stroke={"black"}
                  fill={color}
                  className={
                    "cursor-pointer group-data-[state=open]:stroke-[3px]"
                  }
                  opacity={
                    !activeCategory ||
                    (activeCategory &&
                      attribute.values
                        .map((d) => d.holderConsolidated)
                        .includes(activeCategory))
                      ? 1
                      : 0.2
                  }
                  onContextMenu={
                    !isShared && !isWithoutHolder
                      ? () =>
                          toggleFocus(
                            attribute.values[0].holderConsolidated ?? "",
                            activeCategory
                          )
                      : undefined
                  }
                />
                {isShared && <circle r={circleRadius / 4} />}
              </g>
            </TooltipTrigger>
            <TooltipContent>
              <LocationAttributeCard
                placeName={placeName}
                locationAttribute={attribute}
                color={color}
              />
            </TooltipContent>
          </Tooltip>
        </g>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white p-4 rounded-s shadow">
          <div className="pb-2 mb-2 border-b border-b-[lightgrey]">
            <strong>{attribute.attributeName}</strong> in {placeName}
          </div>
          {attribute.values.map(({ holder, holderConsolidated }, i) => (
            <div key={i} className="flex">
              {holder} <ArrowRightIcon />
              <svg
                className="inline ml-2"
                width={"1em"}
                height={"1em"}
                viewBox={"0 0 1 1"}
              >
                <circle
                  transform="translate(0.5 0.5)"
                  r={0.5}
                  fill={colorScale(holderConsolidated ?? "")}
                />
              </svg>
              {holderConsolidated}
            </div>
          ))}
          <Popover.Close
            className="rounded-full absolute top-[1rem] right-[1rem]"
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default RightCircle;
