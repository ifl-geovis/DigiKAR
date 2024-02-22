import { forwardRef } from "react";

type Props = {
  x: number;
  y: number;
  symbol?: string;
  size: number;
  color: string;
  opacity: number;
  isShared: boolean;
  onContextMenuHandler?: () => void;
};

type Ref = SVGGElement;

const RightShape = forwardRef<Ref, Props>(function RightShape(
  { x, y, size, symbol, color, opacity, isShared, onContextMenuHandler },
  ref,
) {
  const className =
    "cursor-pointer stroke-black group-data-[state=open]:stroke-[3px]";
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
      {isShared && <circle r={size / 4} />}
    </g>
  );
});

export default RightShape;
