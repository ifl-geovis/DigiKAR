import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapViewLayout: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-full grid-cols-[min-content_1fr] grid-rows-[1fr_auto] [grid-template-areas:'aside_map-area''aside_bottom-nav']">
      {children}
    </div>
  );
};

export default MapViewLayout;
