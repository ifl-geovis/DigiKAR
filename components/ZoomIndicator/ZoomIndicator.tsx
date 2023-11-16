import { FC } from "react";
import { TbZoomPan } from "react-icons/tb";
import { useMap } from "react-map-gl/maplibre";

const ZoomIndicator: FC = () => {
  const { current: map } = useMap();
  return (
    <div className="flex items-center gap-2 z-1 absolute rounded-md border-gray-200 border-2 mt-[10px] ml-[10px] bg-white p-2">
      <div className="text-xl">
        <TbZoomPan />
      </div>{" "}
      {map && map.getZoom()}
    </div>
  );
};

export default ZoomIndicator;
