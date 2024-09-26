import { Attribute, HoldersGeneralized } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, useMemo } from "react";
import LocationAttributeCard from "../LocationAttributeCard";
import Tooltip from "../Tooltip";
import TooltipContent from "../Tooltip/TooltipContent";
import TooltipTrigger from "../Tooltip/TooltipTrigger";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import RightShape from "../RightShape";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import getRightStatus from "@/lib/getRightStatus";

type Props = {
  x: number;
  y: number;
  attribute: Attribute<HoldersGeneralized>;
  placeName: string;
  circleRadius: number;
  colorScale: ScaleOrdinal<string, string, string>;
  symbol?: string;
};

const RightIndicator: FC<Props> = ({
  x,
  y,
  attribute,
  placeName,
  circleRadius,
  symbol = "circle",
  colorScale,
}) => {
  const { setActiveCategory, activeCategory } = useRightsExplorerContext();

  const {
    color,
    size,
    isShared,
    isDisputed,
    isUnclear,
    opacity,
    onContextMenuHandler,
  } = useMemo(() => {
    const { isWithoutHolder, isShared, isDisputed, isUnclear } = getRightStatus(
      attribute.holders,
    );
    const holder = attribute.holders.categories?.[0]?.normalize();
    const color =
      isWithoutHolder || isShared || isDisputed
        ? "black"
        : colorScale(holder ?? "");
    const size = isWithoutHolder ? circleRadius / 4 : circleRadius;
    const opacity =
      !activeCategory ||
      (activeCategory && attribute.holders.categories?.includes(activeCategory))
        ? 1
        : 0.2;
    const onContextMenuHandler =
      (!isShared && !isWithoutHolder) || !holder
        ? () =>
            setActiveCategory((prevState?: string) =>
              prevState !== holder ? holder : undefined,
            )
        : undefined;
    return {
      color,
      size,
      opacity,
      isShared,
      isDisputed,
      isUnclear,
      onContextMenuHandler,
    };
  }, [attribute, colorScale, activeCategory, circleRadius, setActiveCategory]);
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <g className="group">
          <Tooltip>
            <TooltipTrigger asChild>
              <RightShape
                x={x}
                y={y}
                symbol={symbol}
                size={size}
                color={color}
                opacity={opacity}
                isShared={isShared}
                isDisputed={isDisputed}
                isUnclear={isUnclear}
                onContextMenuHandler={onContextMenuHandler}
              />
            </TooltipTrigger>
            <TooltipContent>
              <LocationAttributeCard
                placeName={placeName}
                locationAttribute={attribute}
              />
            </TooltipContent>
          </Tooltip>
        </g>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded-s bg-white p-4 shadow">
          <div className="mb-2 border-b border-b-[lightgrey] pb-2">
            <strong>{attribute.attributeName}</strong> in {placeName}
          </div>
          {/* {attribute.holders.map(({ holder, holderConsolidated }, i) => (
            <div key={i} className="flex items-center">
              {holder} <ArrowRightIcon />
              <svg
                className="ml-2 mr-1 inline"
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
          ))} */}
          <Popover.Close
            className="absolute right-[1rem] top-[1rem] rounded-full"
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

export default RightIndicator;
