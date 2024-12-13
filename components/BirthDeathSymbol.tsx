import { LifeEvent } from "@/lib/getPlaceOriginDeath";
import { PieArcDatum, ScaleOrdinal, ScalePower, arc, pie } from "d3";
import { Feature, Point } from "geojson";
import { FC } from "react";

type Props = {
  scaleR: ScalePower<number, number>;
  colorScale: ScaleOrdinal<string, string, string>;
  feature: Feature<Point, { events: LifeEvent[]; place: string }>;
  size: number;
};

const BirthDeathSymbol: FC<Props> = ({ scaleR, colorScale, size, feature }) => {
  const strokeWidth = 1;
  const radius = size / 2;

  const events = feature.properties?.events || [];
  const pieGenerator = pie<LifeEvent>().value(1);
  const arcGenerator = arc<PieArcDatum<LifeEvent>>()
    .innerRadius(0)
    .outerRadius((d) => scaleR(d.data.count));

  const pieData = pieGenerator(events);

  return (
    <svg width={size + strokeWidth * 2} height={size + strokeWidth * 2}>
      <g
        transform={`translate(${radius + strokeWidth}, ${radius + strokeWidth})`}
      >
        {pieData.map((d, i) => {
          const color = colorScale(d.data.event_type);
          return (
            <path
              key={i}
              d={arcGenerator(d) as string}
              fill={color}
              stroke={color}
              fillOpacity={0.2}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default BirthDeathSymbol;
