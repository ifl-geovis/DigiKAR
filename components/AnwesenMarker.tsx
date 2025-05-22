import colorMapCategories from "@/lib/color-map-categories";
import getRightStatus from "@/lib/get-right-status";
import { mapToScale } from "@/lib/helpers";
import { FC } from "react";

type AnwesenProps = {
  categories: string[];
  topLevels: [];
  individuals: [];
  heldBy: number;
  disputedBy: number;
};

type Props = {
  size: number;
  gs: AnwesenProps;
  ng: AnwesenProps;
};

const AnwesenMarker: FC<Props> = ({ size, gs, ng }) => {
  const colorScale = mapToScale(colorMapCategories, "lightgrey");

  const radius = size / 2 - 2;
  const { isDisputed } = getRightStatus(gs);
  return (
    <svg width={size} height={size}>
      <g transform="translate(1 1)">
        <path
          d={`M${radius},0 A${radius},${radius} 0 0 1 ${radius},${2 * radius} Z`}
          fill={isDisputed ? "white" : colorScale(gs.categories?.[0] ?? "")}
          stroke="currentColor"
        />
        {isDisputed && (
          <path
            d={`M${radius},${radius * 0.75} A${radius / 4},${radius / 4} 0 0 1 ${radius},${1.25 * radius} Z`}
          />
        )}
        <path
          d={`M${radius},0 A${radius},${radius} 0 0 0 ${radius},${2 * radius} Z`}
          fill={isDisputed ? "white" : colorScale(ng.categories?.[0] ?? "")}
          stroke="currentColor"
        />
        {isDisputed && (
          <path
            d={`M${radius},${radius * 1.25} A${radius / 4},${radius / 4} 0 0 1 ${radius},${0.75 * radius} Z`}
          />
        )}
      </g>
    </svg>
  );
};

export default AnwesenMarker;
