import { ScalePower, descending } from "d3";
import { Feature, Point } from "geojson";
import { FC } from "react";

type Props = {
  scaleR: ScalePower<number, number>;
  feature: Feature<Point>;
  size: number;
};

const BirthDeathSymbol: FC<Props> = ({ scaleR, size, feature }) => {
  const strokeWidth = 2;
  const circles = [
    { type: "births", value: feature.properties?.Geburt },
    { type: "deaths", value: feature.properties?.Tod },
  ].sort((a, b) => descending(a.value, b.value));
  return (
    <svg width={size + strokeWidth * 2} height={size + strokeWidth * 2}>
      {circles.map((d) => (
        <circle
          key={d.type}
          cx={size / 2 + strokeWidth}
          cy={size / 2 + strokeWidth}
          r={scaleR(d.value)}
          fillOpacity={0.5}
          fill="transparent"
          strokeWidth={strokeWidth}
          stroke={d.type === "births" ? "cornflowerblue" : "orange"}
        />
      ))}
    </svg>
  );
};

export default BirthDeathSymbol;
