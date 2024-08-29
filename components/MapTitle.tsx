import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const MapTitle: FC<Props> = ({ children }) => {
  return <h2 className="mb-0 font-light">{children}</h2>;
};

export default MapTitle;
