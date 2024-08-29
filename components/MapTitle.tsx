import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const MapTitle: FC<Props> = ({ children }) => {
  return <h2 className="mb-0 font-thin">{children}</h2>;
};

export default MapTitle;
