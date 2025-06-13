import { FC } from "react";
import { RxGlobe } from "react-icons/rx";
import MapControl from "../MapControl";
import { useMapStateContext } from "../MapState/MapStateContext";

const ZoomIndicator: FC = () => {
  const { viewState } = useMapStateContext();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return (
    <MapControl>
      <div className="flex items-center gap-2 p-2 font-mono text-xs">
        <RxGlobe />
        <span>{viewState.zoom.toFixed(2)}</span>
      </div>
    </MapControl>
  );
};

export default ZoomIndicator;
