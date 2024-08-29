import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapViewLayout: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-full grid-cols-[1fr_2.5fr] grid-rows-[50px_1fr_30px] grid-areas-[layerControl_dataControl_zoomControl,aside_._.,._._.]">
      {children}
    </div>
  );
};

export default MapViewLayout;
