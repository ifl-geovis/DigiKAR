import getRightStatus from "@/lib/getRightStatus";
import { Attribute, HoldersGeneralized } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, useCallback, useMemo } from "react";
import LocationAttributeCard from "../LocationAttributeCard";
import RightShape from "../RightShape";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import Tooltip from "../Tooltip";
import TooltipContent from "../Tooltip/TooltipContent";
import TooltipTrigger from "../Tooltip/TooltipTrigger";

type Props = {
  x: number;
  y: number;
  attribute: Attribute<HoldersGeneralized>;
  placeId: string;
  placeName: string;
  circleRadius: number;
  colorScale: ScaleOrdinal<string, string, string>;
  symbol?: string;
};

const RightIndicator: FC<Props> = ({
  x,
  y,
  attribute,
  placeId,
  placeName,
  circleRadius,
  symbol = "circle",
  colorScale,
}) => {
  const { setActiveCategory, activeCategory, setDetailInfo } =
    useRightsExplorerContext();

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
  const onClickHandler = useCallback(() => {
    setDetailInfo({
      place: placeId,
      attribute: attribute.attributeName,
    });
  }, [attribute.attributeName, placeId, setDetailInfo]);
  return (
    <>
      <g className="group" onClick={onClickHandler}>
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
    </>
  );
};

export default RightIndicator;
