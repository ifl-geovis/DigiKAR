import { FC, PropsWithChildren } from "react";

const MapStage: FC<PropsWithChildren> = ({ children }) => (
  <div className="h-[800px] w-full shadow-md rounded-sm bg-white">
    {children}
  </div>
);

export default MapStage;
