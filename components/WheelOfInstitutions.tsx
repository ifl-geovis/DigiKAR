import { FC } from "react";

type Functions = {
  [index: string]: number;
};

type Props = {
  institutions: {
    properties: {
      place: string;
      institution: string;
      functionalities: Functions;
    };
  }[];
};

const WheelOfInstitutions: FC<Props> = ({ institutions }) => {
  const markerSize = 100;
  const padding = 20;
  const size = markerSize + padding * 2;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={2} />
      {institutions.map((d, idx, arr) => {
        return (
          <g
            key={idx}
            transform={`translate(${size / 2} ${size / 2}) rotate(${
              (360 / arr.length) * (idx + 1) - 90
            })`}
          >
            <line x2={markerSize / 2} stroke="lightgrey" />
            {Object.entries(d.properties.functionalities).map(
              ([key, value], idx) => (
                <circle
                  key={key}
                  cx={15 + 2 * idx}
                  r={Math.sqrt(value) * 1.5}
                  fill="red"
                  stroke="red"
                  strokeWidth={0.5}
                  fillOpacity={0.25}
                />
              ),
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default WheelOfInstitutions;
