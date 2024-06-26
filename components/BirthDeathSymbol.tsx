import { ScalePower } from "d3";
import { Feature, Point } from "geojson";
import { FC } from "react";

type Props = {
  scaleR: ScalePower<number, number>;
  feature: Feature<Point>;
  size: number;
};

const BirthDeathSymbol: FC<Props> = ({ scaleR, size, feature }) => {
  const strokeWidth = 2;
  return (
    <svg width={size + strokeWidth * 2} height={size + strokeWidth * 2}>
      <circle
        key={feature.properties?.id}
        cx={size / 2 + strokeWidth}
        cy={size / 2 + strokeWidth}
        r={scaleR(feature.properties?.value)}
        fillOpacity={0.5}
        fill="transparent"
        strokeWidth={strokeWidth}
        stroke={feature.properties?.event_type === "Geburt" ? "pink" : "red"}
      />
    </svg>
  );
};

export default BirthDeathSymbol;
