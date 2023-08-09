import { FC, Fragment, SVGProps } from "react";
import { getNgonPoints } from "../Ngon/NgonPoints.helper";
import Ngon from "../Ngon/Ngon";
import { SpaceEstablishingAttribute } from "../../types/PlaceProperties";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import LocationAttributeCard from "./LocationAttributeCard";
import Center from "../Center";
import { ScaleOrdinal, range, scaleOrdinal, schemeTableau10, union } from "d3";

type Props = {
  /**
   * How should the place be labelled?
   */
  placeName: string;
  /**
   * Which space-establishing attributes should be visualized? (uni or bivariate data with multiple expressions)
   */
  placeAttributes: SpaceEstablishingAttribute[];
  /**
   * How large should the radius of the Ngon be?
   */
  radius: number;
  /**
   * How large should the radius of the circles be?
   */
  circleRadius?: number;
  /**
   * Which category should be active
   */
  activeCategory?: string;
  /**
   * According to what colorScheme should the circles be coloured?
   */
  colorScale?: ScaleOrdinal<string, string>;
  /**
   * Function to set uplifted state
   */
  handleCategoryClick?: (category: string | undefined) => void;
  /**
   * Should a center element be drawn.
   */
  drawCenter?: boolean;
} & SVGProps<SVGGElement>;

const NgonWithCircles: FC<Props> = ({
  placeName,
  placeAttributes,
  radius,
  circleRadius = radius / 4,
  colorScale = scaleOrdinal<string, string>().range(schemeTableau10),
  activeCategory,
  handleCategoryClick: onIsClicked,
  drawCenter = false,
  ...rest
}) => {
  const sides = placeAttributes.length;
  const outerRadius = radius - circleRadius;
  const points = getNgonPoints(outerRadius, sides);

  const setFocus = (newFocus: string, currentFocus: string | undefined) => {
    if (!onIsClicked) return undefined;
    if (newFocus === currentFocus) return onIsClicked(undefined);
    onIsClicked(newFocus);
  };
  return (
    <g {...rest}>
      <Ngon radius={outerRadius} sides={sides} fill={"none"} stroke={"grey"} />
      {drawCenter && (
        <Center
          radius={outerRadius}
          stroke="transparent"
          placeName={placeName}
          placeAttributes={placeAttributes}
        />
      )}
      {points.map((d, i) => {
        const l = placeAttributes[i];
        const firstHolder = l.values[0]
          ? l.values[0].holderConsolidated
          : undefined;
        const distHoldersConsolidated = Array.from(
          union(l.values.map((h) => h.holderConsolidated))
        );
        return (
          <Fragment key={i}>
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <circle
                  className="cursor-pointer"
                  r={firstHolder ? circleRadius : 1}
                  cx={d.x}
                  cy={d.y}
                  stroke={"black"}
                  fill={firstHolder ? colorScale(firstHolder) : "black"}
                  opacity={
                    activeCategory && activeCategory !== firstHolder ? 0.2 : 1
                  }
                  onClick={
                    firstHolder
                      ? () => {
                          setFocus(firstHolder, activeCategory);
                        }
                      : undefined
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <LocationAttributeCard
                  placeName={placeName}
                  locationAttribute={l}
                  color={firstHolder ? colorScale(firstHolder) : "transparent"}
                />
              </TooltipContent>
            </Tooltip>
            <g>
              {distHoldersConsolidated.length > 1 &&
                range(distHoldersConsolidated.length).map((_, i) => (
                  <circle
                    key={i}
                    cx={d.x}
                    cy={d.y}
                    r={circleRadius + i * 3}
                    strokeWidth={0.5}
                    stroke={"grey"}
                    fill={"none"}
                  />
                ))}
            </g>
          </Fragment>
        );
      })}
    </g>
  );
};

export default NgonWithCircles;
