import { FC, SVGProps } from "react";
import Ngon from "../Ngon";
import { Attribute, HoldersGeneralized } from "../../types/PlaceProperties";
import { interpolateGreys, scaleSequential } from "d3";
import Tooltip from "../Tooltip";
import TooltipContent from "../Tooltip/TooltipContent";
import TooltipTrigger from "../Tooltip/TooltipTrigger";

type Props = {
  /**
   * How should the place be labelled?
   */
  placeName: string;
  /**
   * Which attributes should be visualized? (uni or bivariate data with multiple expressions)
   */
  placeAttributes: Attribute<HoldersGeneralized>[];
  /**
   * How large should the radius of the Ngon be?
   */
  radius: number;
} & SVGProps<SVGPolygonElement>;

const Center: FC<Props> = ({ placeName, placeAttributes, radius, ...rest }) => {
  const sides = placeAttributes.length;

  // number of unique related Entities
  // TODO: implement new calculation of complexity, considering multiple right-holders per right
  const complexity = new Set(
    placeAttributes.map((d) => d.holders.categories?.[0]),
  ).size;
  const colorScale = scaleSequential(interpolateGreys).domain([
    1,
    placeAttributes.length,
  ]);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <g>
          <Ngon
            radius={radius}
            sides={sides}
            fill={colorScale(complexity)}
            stroke={"black"}
            {...rest}
          />
        </g>
      </TooltipTrigger>
      <TooltipContent>{placeName}</TooltipContent>
    </Tooltip>
  );
};

export default Center;
