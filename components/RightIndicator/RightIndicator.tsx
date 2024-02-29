import { Attribute } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, useMemo } from "react";
import LocationAttributeCard from "../LocationAttributeCard";
import Tooltip from "../Tooltip";
import TooltipContent from "../Tooltip/TooltipContent";
import TooltipTrigger from "../Tooltip/TooltipTrigger";
import * as Popover from "@radix-ui/react-popover";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import RightShape from "../RightShape";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";

type Props = {
  x: number;
  y: number;
  attribute: Attribute;
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
  const { isShared, color, size, opacity, onContextMenuHandler } =
    useMemo(() => {
      const isWithoutHolder = attribute.holders.length === 0;
      const isShared = attribute.holders.length > 1;
      const color = isWithoutHolder
        ? "black"
        : isShared
          ? "white"
          : colorScale(attribute.holders[0].holderConsolidated ?? "");
      const size = isWithoutHolder ? circleRadius / 4 : circleRadius;
      const opacity =
        !activeCategory ||
        (activeCategory &&
          attribute.holders
            .map((d) => d.holderConsolidated)
            .includes(activeCategory))
          ? 1
          : 0.2;
      const holder = attribute.holders[0]?.holderConsolidated;
      const onContextMenuHandler =
        (!isShared && !isWithoutHolder) || !holder
          ? () =>
              setActiveCategory((prevState?: string) =>
                prevState !== holder ? holder : undefined,
              )
          : undefined;
      return {
        isShared,
        color,
        size,
        opacity,
        onContextMenuHandler,
      };
    }, [
      attribute,
      colorScale,
      activeCategory,
      circleRadius,
      setActiveCategory,
    ]);
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
                onContextMenuHandler={onContextMenuHandler}
              />
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
        <Popover.Content className="rounded-s bg-white p-4 shadow">
          <div className="mb-2 border-b border-b-[lightgrey] pb-2">
            <strong>{attribute.attributeName}</strong> in {placeName}
          </div>
          {attribute.holders.map(({ holder, holderConsolidated }, i) => (
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
          ))}
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
