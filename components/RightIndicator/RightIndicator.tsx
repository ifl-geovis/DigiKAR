import getRightStatus from "@/lib/getRightStatus";
import { Attribute, RightWithPerspectives } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, useCallback, useMemo } from "react";
import RightShape from "../RightShape";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { getRightHolderNames } from "@/lib/getRightHolderNames";

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
    setSelectedLegendItem,
    selectedLegendItem,
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
      !selectedLegendItem ||
      (selectedLegendItem && names.includes(selectedLegendItem))
        ? 1
        : 0.2;
    const onContextMenuHandler =
      (!isShared && !isWithoutHolder) || !holder
        ? () =>
            setSelectedLegendItem((prevState?: string) =>
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
  }, [
    perspective,
    attribute,
    colorScale,
    selectedLegendItem,
    circleRadius,
    setSelectedLegendItem,
  ]);
  const onClickHandler = useCallback(
    () =>
      setDetailInfo(
        attribute.holders.categories?.length
          ? {
              place: placeId,
              attribute: attribute.attributeName,
            }
          : undefined,
      ),
    [attribute.attributeName, attribute.holders, placeId, setDetailInfo],
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
      opacity={opacity}
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
