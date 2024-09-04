import { HTMLProps, forwardRef } from "react";

type Props = HTMLProps<HTMLDivElement>;

const MapControl = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="flex h-7 min-w-7 items-center justify-center rounded-sm bg-white shadow-[0_0_0_2px_rgba(0,0,0,0.1)]"
    >
      {children}
    </div>
  );
});
MapControl.displayName = "MapControl";

export default MapControl;
