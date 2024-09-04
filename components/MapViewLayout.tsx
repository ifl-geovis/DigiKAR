import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapViewLayout: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-full grid-cols-[400px_1fr] grid-rows-[1fr_30px] grid-areas-[aside_.,._.]">
      {children}
    </div>
  );
};

export default MapViewLayout;
