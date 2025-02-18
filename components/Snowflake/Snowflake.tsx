import { ScaleOrdinal, scaleOrdinal, schemeTableau10 } from "d3";
import { FC, SVGProps, memo } from "react";
import { Attribute, RightWithPerspectives } from "../../types/PlaceProperties";
import RightIndicator from "../RightIndicator";
import useSnowflake from "./useSnowflake.hook";

type Props = {
  /**
   * The ID of the place
   */
  placeId: string;
  /**
   * How should the place be labelled?
   */
  placeName: string;
  /**
   * Which space-establishing attributes should be visualized? (uni or bivariate data with multiple expressions)
   */
  placeAttributes: Attribute<RightWithPerspectives>[];
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
  placeId,
  placeName,
  placeAttributes,
  radius,
  circleRadius = radius / 3,
  colorScale = scaleOrdinal<string, string>().range(schemeTableau10),
  attributeOrder,
  symbolScale,
  ...rest
}) => {
  const { points } = useSnowflake(
    placeAttributes,
    radius,
    circleRadius,
    attributeOrder ?? [],
  );

  return (
    <g {...rest}>
      {points.map(({ x, y, attributeName, holders }) => {
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
              placeName={placeName}
              placeId={placeId}
            />
          </g>
        );
      })}
    </g>
  );
};

export default Snowflake;

export const SnowflakeMemoized = memo(Snowflake);
