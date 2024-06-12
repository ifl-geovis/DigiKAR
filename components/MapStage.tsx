import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = PropsWithChildren<{ className?: string }>;

const MapStage: FC<Props> = ({ children, className }) => (
  <div
    className={twMerge(
      "h-[700px] w-full rounded-sm bg-white shadow-md",
      className,
    )}
  >
    {children}
  </div>
);

export default MapStage;
