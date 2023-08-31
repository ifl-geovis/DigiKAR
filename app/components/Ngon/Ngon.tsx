import { FC, SVGProps } from "react";
import { getNgonPoints } from "./Ngon.helpers";

type Props = {
  radius: number;
  sides: number;
} & SVGProps<SVGPolygonElement>;

const Ngon: FC<Props> = ({ sides, radius, ...rest }) => {
  const points = getNgonPoints(radius, sides)
    .map((d) => `${d.x} ${d.y}`)
    .join(" ");
  return <polygon points={points} {...rest} />;
};

export default Ngon;
