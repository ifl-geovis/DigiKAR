import { FC } from "react";
import { TbZoomPan } from "react-icons/tb";
import { useMap } from "react-map-gl/maplibre";

const ZoomIndicator: FC = () => {
  const { current: map } = useMap();
  return (
    <div className="z-1 absolute ml-[10px] mt-[10px] flex items-center gap-2 rounded-md border-2 border-gray-200 bg-white p-2">
      <div className="text-xl">
        <TbZoomPan />
      </div>{" "}
      {map && Math.round(map.getZoom() * 100) / 100}
    </div>
  );
};

export default ZoomIndicator;
