import { Attribute } from "@/types/PlaceProperties";
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
  attribute: Attribute;
  placeName: string;
  circleRadius: number;
  activeCategory?: string;
  colorScale: ScaleOrdinal<string, string, string>;
  symbol?: string;
  toggleFocus: (newFocus: string, activeCategory?: string) => void;
};

const RightIndicator: FC<Props> = ({
  x,
  y,
  attribute,
  placeName,
  circleRadius,
  symbol = "circle",
  activeCategory,
  colorScale,
  toggleFocus,
}) => {
  const { isShared, color, size, opacity, onContextMenuHandler, className } =
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
      const onContextMenuHandler =
        !isShared && !isWithoutHolder
          ? () =>
              toggleFocus(
                attribute.holders[0].holderConsolidated ?? "",
                activeCategory,
              )
          : undefined;
      const className =
        "cursor-pointer stroke-black group-data-[state=open]:stroke-[3px]";
      return {
        isShared,
        color,
        size,
        opacity,
        onContextMenuHandler,
        className,
      };
    }, [attribute, colorScale, activeCategory, circleRadius, toggleFocus]);
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <g className="group">
          <Tooltip>
            <TooltipTrigger asChild>
              <g transform={`translate(${x} ${y})`}>
                {symbol === "circle" ? (
                  <circle
                    r={size}
                    fill={color}
                    className={className}
                    opacity={opacity}
                    onContextMenu={onContextMenuHandler}
                  />
                ) : (
                  <rect
                    width={(size * 5) / 3}
                    height={(size * 5) / 3}
                    transform={`translate(${(-size * 5) / 3 / 2} ${
                      (-size * 5) / 3 / 2
                    })`}
                    fill={color}
                    className={className}
                    opacity={opacity}
                    onContextMenu={onContextMenuHandler}
                  />
                )}
                {isShared && <circle r={size / 4} />}
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
