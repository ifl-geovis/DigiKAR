import { FC } from "react";

const size = 14;
const margin = 2;
const r = (size - margin) / 2;
const center = size / 2;

const Spinner: FC = () => {
  return (
    <svg className="animate-spin" width={size} height={size}>
      <g transform={`translate(${center} ${center})`}>
        <circle
          r={r}
          fill="none"
          strokeDasharray="1 1"
          strokeDashoffset={0.5}
          stroke="currentColor"
          opacity={0.25}
        />
        <path
          d={`M ${r} 0 a ${r} ${r} 0 1 1 ${-r} ${-r}`}
          stroke="currentColor"
          fill="none"
        />
      </g>
    </svg>
  );
};

export default Spinner;
