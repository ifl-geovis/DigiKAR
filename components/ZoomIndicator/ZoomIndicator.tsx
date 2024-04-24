import { FC } from "react";
import { useMap } from "react-map-gl/maplibre";
import MapControl from "../MapControl";
import { RxGlobe } from "react-icons/rx";

const ZoomIndicator: FC = () => {
  const { current: map } = useMap();
  return (
    <MapControl>
      <div className="flex items-center gap-2 px-3">
        <RxGlobe />
        <span>{map && Math.round(map.getZoom() * 100) / 100}</span>
      </div>
    </MapControl>
  );
};

export default ZoomIndicator;
