import { ScaleOrdinal, range, scaleOrdinal, schemeTableau10, union } from "d3";
import { FC, SVGProps } from "react";
import { Attribute } from "../../types/PlaceProperties";
import Center from "../Center";
import RightIndicator from "../RightIndicator";
import useSnowflake from "./useSnowflake.hook";

type Props = {
  /**
   * How should the place be labelled?
   */
  placeName: string;
  /**
   * Which space-establishing attributes should be visualized? (uni or bivariate data with multiple expressions)
   */
  placeAttributes: Attribute[];
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
  /** In what order should attributes be displayed (clockwise, starting at 12 o'clock)? */
  attributeOrder?: string[];
  /** As which symbol (circle or square) should each attribute be visualized? */
  symbolScale?: ScaleOrdinal<string, string, string>;
} & SVGProps<SVGGElement>;

const Snowflake: FC<Props> = ({
  placeName,
  placeAttributes,
  radius,
  circleRadius = radius / 3,
  colorScale = scaleOrdinal<string, string>().range(schemeTableau10),
  activeCategory,
  handleCategoryClick: onIsClicked,
  drawCenter = false,
  attributeOrder,
  symbolScale,
  ...rest
}) => {
  const { points, outerRadius } = useSnowflake(
    placeAttributes,
    radius,
    circleRadius,
    attributeOrder,
  );

  const setFocus = (newFocus: string, currentFocus: string | undefined) => {
    if (!onIsClicked) return undefined;
    if (newFocus === currentFocus) return onIsClicked(undefined);
    onIsClicked(newFocus);
  };
  return (
    <g {...rest}>
      {points.map(({ x, y, attributeName, holders }) => {
        const distHoldersConsolidated = Array.from(
          union(holders.map((h) => h.holderConsolidated)),
        );
        return (
          <g key={`ray-${attributeName}`}>
            <line x2={x} y2={y} stroke={"black"} />
            <RightIndicator
              colorScale={colorScale}
              symbol={symbolScale && symbolScale(attributeName)}
              circleRadius={circleRadius}
              x={x}
              y={y}
              attribute={{ attributeName, holders }}
              activeCategory={activeCategory}
              placeName={placeName}
              toggleFocus={setFocus}
            />
            <g pointerEvents="none">
              {distHoldersConsolidated.length > 1 &&
                range(distHoldersConsolidated.length).map((_, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
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
