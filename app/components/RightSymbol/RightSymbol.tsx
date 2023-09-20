import {
  Holder,
  SpaceEstablishingAttribute,
} from "@/app/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC } from "react";
import LocationAttributeCard from "../LocationAttributeCard";
import Tooltip from "../Tooltip";
import TooltipContent from "../Tooltip/TooltipContent";
import TooltipTrigger from "../Tooltip/TooltipTrigger";

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
  const firstHolder = attribute.values[0]
    ? attribute.values[0].holderConsolidated ?? "NA"
    : "NA";
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <circle
          r={firstHolder !== "NA" ? circleRadius : circleRadius / 4}
          cx={x}
          cy={y}
          stroke={"black"}
          fill={firstHolder != "NA" ? colorScale(firstHolder) : "black"}
          className={"cursor-pointer"}
          opacity={activeCategory && activeCategory !== firstHolder ? 0.2 : 1}
          onClick={() => console.log(firstHolder)}
          onContextMenu={() => toggleFocus(firstHolder, activeCategory)}
        />
      </TooltipTrigger>
      <TooltipContent>
        <LocationAttributeCard
          placeName={placeName}
          locationAttribute={attribute}
          color={colorScale(firstHolder)}
        />
      </TooltipContent>
    </Tooltip>
  );
};

export default RightCircle;
