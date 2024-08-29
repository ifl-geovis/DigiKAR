import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapContainer: FC<Props> = ({ children }) => {
  return <div className="col-span-full row-span-full">{children}</div>;
};

export default MapContainer;
