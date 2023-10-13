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
  const markerSize = 300;
  return (
    <svg width={markerSize} height={markerSize}>
      <circle cx={markerSize / 2} cy={markerSize / 2} r={2} />
      {institutions.map((d, idx, arr) => {
        return (
          <g
            key={idx}
            transform={`translate(${markerSize / 2} ${markerSize / 2}) rotate(${
              (360 / arr.length) * (idx + 1) - 90
            })`}
          >
            <line x2={markerSize / 2} stroke="lightgrey" />
            {Object.entries(d.properties.functionalities).map(
              ([key, value], idx) => (
                <circle
                  key={key}
                  cx={15 + 10 * idx}
                  r={Math.sqrt(value) * 2}
                  fill="red"
                  fillOpacity={0.75}
                />
              )
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default WheelOfInstitutions;
