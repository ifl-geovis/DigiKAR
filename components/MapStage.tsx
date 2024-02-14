import { FC, PropsWithChildren } from "react";

const MapStage: FC<PropsWithChildren> = ({ children }) => (
  <div className="h-[700px] w-full rounded-sm bg-white shadow-md">
    {children}
  </div>
);

export default MapStage;
