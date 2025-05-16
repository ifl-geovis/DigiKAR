import { FC, SVGProps } from "react";
import DisputedIcon from "/public/icons/disputed.svg";
import SharedIcon from "/public/icons/shared.svg";
import UnclearIcon from "/public/icons/unclear.svg";

type Props = {
  x: number;
  y: number;
  symbol?: string;
  size: number;
  color: string;
  isShared: boolean;
  isDisputed: boolean;
  isUnclear: boolean;
} & SVGProps<SVGGElement>;

const RightShape: FC<Props> = ({
  x,
  y,
  size,
  symbol,
  color,
  isShared,
  isDisputed,
  isUnclear,
  ...rest
}) => {
  const className =
    "cursor-pointer stroke-black hover:stroke-2 transition-all group-data-[state=open]:stroke-[3px]";
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      {symbol === "square" ? (
        <rect
          width={(size * 5) / 3}
          height={(size * 5) / 3}
          transform={`translate(${(-size * 5) / 3 / 2} ${(-size * 5) / 3 / 2})`}
          fill={color}
          className={className}
        />
      ) : (
        <circle r={size} fill={color} className={className} />
      )}
      {isShared && <SharedIcon x="-7" y="-7" />}
      {isDisputed && <DisputedIcon x="-7" y="-7" />}
      {!isShared && isUnclear && (
        <UnclearIcon x="-7" y="-7" className="text-black" />
      )}
    </g>
  );
};

export default RightShape;
