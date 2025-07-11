import getRightStatus from "@/lib/get-right-status";
import { Attribute, RightWithPerspectives } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, useCallback, useMemo } from "react";
import RightShape from "../RightShape";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { getRightHolderNames } from "@/lib/get-right-holder-names";

type Props = {
  x: number;
  y: number;
  attribute: Attribute<RightWithPerspectives>;
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
  const {
    setSelectedLegendItems,
    selectedLegendItems,
    setDetailInfo,
    setTooltipInfo,
    perspective,
  } = useRightsExplorerContext();

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
      perspective,
    );

    const names = getRightHolderNames(attribute.holders[perspective]);
    const holder = names?.[0] ?? "";
    const color = isWithoutHolder
      ? "black"
      : isShared || isDisputed
        ? "white"
        : colorScale(holder);
    const size = isWithoutHolder ? circleRadius / 4 : circleRadius;
    const opacity =
      selectedLegendItems.length === 0 ||
      names
        .filter((n): n is string => typeof n === "string")
        .some((n) => selectedLegendItems.includes(n))
        ? 1
        : 0.2;
    const onContextMenuHandler =
      (!isShared && !isWithoutHolder) || !holder
        ? () =>
            setSelectedLegendItems((prevState) => {
              if (prevState.includes(holder)) {
                return prevState.filter((i) => i !== holder);
              } else {
                return [...prevState, holder];
              }
            })
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
  }, [
    perspective,
    attribute,
    colorScale,
    selectedLegendItems,
    circleRadius,
    setSelectedLegendItems,
  ]);
  const onClickHandler = useCallback(
    () =>
      setDetailInfo(
        (perspective === "categories" &&
          attribute.holders.categories?.length) ||
          (perspective === "individuals" &&
            attribute.holders.individuals?.length) ||
          (perspective === "topLevels" && attribute.holders.topLevels?.length)
          ? {
              place: placeId,
              attribute: attribute.attributeName,
            }
          : undefined,
      ),
    [
      attribute.attributeName,
      attribute.holders,
      placeId,
      setDetailInfo,
      perspective,
    ],
  );
  const onMouseEnterHandler = useCallback(() => {
    setTooltipInfo({
      placeName: placeName,
      attribute: attribute,
    });
  }, [attribute, placeName, setTooltipInfo]);
  const onMouseLeaveHandler = useCallback(() => {
    setTooltipInfo(undefined);
  }, [setTooltipInfo]);
  return (
    <RightShape
      x={x}
      y={y}
      symbol={symbol}
      size={size}
      color={color}
      style={{ opacity }}
      className="transition-opacity duration-750"
      isShared={isShared}
      isDisputed={isDisputed}
      isUnclear={isUnclear}
      onMouseLeave={onMouseLeaveHandler}
      onMouseEnter={onMouseEnterHandler}
      onContextMenu={onContextMenuHandler}
      onClick={onClickHandler}
    />
  );
};

export default RightIndicator;
