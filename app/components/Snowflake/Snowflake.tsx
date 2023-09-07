import { FC, SVGProps } from "react";
import { getNgonPoints } from "../Ngon/Ngon.helpers";
import { SpaceEstablishingAttribute } from "../../types/PlaceProperties";
import Tooltip from "../Tooltip";
import TooltipTrigger from "../Tooltip/TooltipTrigger";
import TooltipContent from "../Tooltip/TooltipContent";
import LocationAttributeCard from "../LocationAttributeCard";
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
   * How large should the radius of the snwoflake be?
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
  colorScale?: ScaleOrdinal<string, string, string>;
  /**
   * Function to set uplifted state
   */
  handleCategoryClick?: (category: string | undefined) => void;
  /**
   * Should a center element be drawn.
   */
  drawCenter?: boolean;
} & SVGProps<SVGGElement>;

const Snowflake: FC<Props> = ({
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
  const rays = placeAttributes.length;
  const outerRadius = radius - circleRadius;
  const points = getNgonPoints(outerRadius, rays);

  const setFocus = (newFocus: string, currentFocus: string | undefined) => {
    if (!onIsClicked) return undefined;
    if (newFocus === currentFocus) return onIsClicked(undefined);
    onIsClicked(newFocus);
  };
  return (
    <g {...rest}>
      {points.map((d, i) => {
        const l = placeAttributes[i];
        const distHoldersConsolidated = Array.from(
          union(l.values.map((h) => h.holderConsolidated))
        );
        const firstHolder = l.values[0]
          ? l.values[0].holderConsolidated ?? "NA"
          : "NA";
        return (
          <g key={`ray-${i}`}>
            <line x2={d.x} y2={d.y} stroke={"black"} />
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <circle
                  r={firstHolder !== "NA" ? circleRadius : circleRadius / 4}
                  cx={d.x}
                  cy={d.y}
                  stroke={"black"}
                  fill={firstHolder != "NA" ? colorScale(firstHolder) : "black"}
                  className={"cursor-pointer"}
                  opacity={
                    activeCategory && activeCategory !== firstHolder ? 0.2 : 1
                  }
                  onClick={() => {
                    setFocus(firstHolder, activeCategory);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <LocationAttributeCard
                  placeName={placeName}
                  locationAttribute={l}
                  color={colorScale(firstHolder)}
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
          </g>
        );
      })}
      {drawCenter && (
        <Center
          placeName={placeName}
          radius={outerRadius / 2}
          placeAttributes={placeAttributes}
        />
      )}
    </g>
  );
};

export default Snowflake;
