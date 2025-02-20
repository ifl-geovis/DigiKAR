import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapViewLayout: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-full grid-cols-[min-content_1fr] grid-rows-[1fr_auto_50px] [grid-template-areas:'aside_.''aside_bottom-nav''._.']">
      {children}
    </div>
  );
};

export default MapViewLayout;
