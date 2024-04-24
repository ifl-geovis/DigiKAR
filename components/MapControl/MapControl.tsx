import { HTMLProps, forwardRef } from "react";

type Props = HTMLProps<HTMLDivElement>;

const MapControl = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-md border-2 border-gray-200 bg-white"
    >
      {children}
    </div>
  );
});
MapControl.displayName = "MapControl";

export default MapControl;
