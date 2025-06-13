import { HTMLProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLProps<HTMLDivElement>;

const MapControl = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          "flex items-center justify-center rounded-sm bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.1)]",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);
MapControl.displayName = "MapControl";

export default MapControl;
