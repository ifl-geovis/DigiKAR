import { ScaleOrdinal, range, scaleOrdinal, schemeTableau10, union } from "d3";
import { FC, SVGProps } from "react";
import { SpaceEstablishingAttribute } from "../../types/PlaceProperties";
import Center from "../Center";
import { getNgonPoints } from "../Ngon/Ngon.helpers";
import RightSymbol from "../RightSymbol";

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
        const attribute = placeAttributes[i];
        const distHoldersConsolidated = Array.from(
          union(attribute.values.map((h) => h.holderConsolidated))
        );
        return (
          <g key={`ray-${i}`}>
            <line x2={d.x} y2={d.y} stroke={"black"} />
            <RightSymbol
              colorScale={colorScale}
              circleRadius={circleRadius}
              x={d.x}
              y={d.y}
              attribute={attribute}
              activeCategory={activeCategory}
              placeName={placeName}
              toggleFocus={setFocus}
            />
            <g pointerEvents="none">
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
