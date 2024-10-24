import { forwardRef } from "react";
import DisputedIcon from "/public/icons/disputed.svg";
import SharedIcon from "/public/icons/shared.svg";
import UnclearIcon from "/public/icons/unclear.svg";

type Props = {
  x: number;
  y: number;
  symbol?: string;
  size: number;
  color: string;
  opacity: number;
  isShared: boolean;
  isDisputed: boolean;
  isUnclear: boolean;
  onContextMenuHandler?: () => void;
};

type Ref = SVGGElement;

const RightShape = forwardRef<Ref, Props>(function RightShape(
  {
    x,
    y,
    size,
    symbol,
    color,
    opacity,
    isShared,
    isDisputed,
    isUnclear,
    onContextMenuHandler,
  },
  ref,
) {
  const className =
    "cursor-pointer stroke-black hover:stroke-2 transition-all group-data-[state=open]:stroke-[3px]";
  return (
    <g ref={ref} transform={`translate(${x} ${y})`}>
      {symbol === "square" ? (
        <rect
          width={(size * 5) / 3}
          height={(size * 5) / 3}
          transform={`translate(${(-size * 5) / 3 / 2} ${(-size * 5) / 3 / 2})`}
          fill={color}
          className={className}
          opacity={opacity}
          onContextMenu={onContextMenuHandler}
        />
      ) : (
        <circle
          r={size}
          fill={color}
          className={className}
          opacity={opacity}
          onContextMenu={onContextMenuHandler}
        />
      )}
      {isShared && <SharedIcon x="-7" y="-7" className="text-white" />}
      {isDisputed && <DisputedIcon x="-7" y="-7" className="text-white" />}
      {!isShared && isUnclear && (
        <UnclearIcon x="-7" y="-7" className="text-black" />
      )}
    </g>
  );
});

export default RightShape;
