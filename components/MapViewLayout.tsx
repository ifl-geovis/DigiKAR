import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapViewLayout: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-full grid-cols-[400px_1fr] grid-rows-[1fr_50px] overflow-hidden grid-areas-[aside_.,._.]">
      {children}
    </div>
  );
};

export default MapViewLayout;
