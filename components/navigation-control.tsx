import { FC } from "react";
import MapControl from "./MapControl";
import { useMap } from "react-map-gl/maplibre";
import { RxMinus, RxPlus } from "react-icons/rx";
import { useMapStateContext } from "./MapState/MapStateContext";

const NavigationControl: FC = () => {
  const { rightsMap } = useMap();
  const { viewState } = useMapStateContext();
  console.log(viewState.bearing);
  return (
    <MapControl className="h-auto w-auto">
      <div className="flex flex-col">
        <button
          className="flex cursor-pointer items-center border-b border-gray-300 p-2 hover:bg-gray-50"
          aria-label="Zoom in"
          onClick={() => rightsMap?.zoomIn()}
        >
          <RxPlus />
        </button>
        <button
          className="flex cursor-pointer items-center border-b border-gray-300 p-2 hover:bg-gray-50"
          aria-label="Zoom out"
          onClick={() => rightsMap?.zoomOut()}
        >
          <RxMinus />
        </button>
        <button
          className="flex cursor-pointer items-center p-2 hover:bg-gray-50"
          aria-label="Reset north"
          onClick={() => rightsMap?.resetNorth()}
        >
          <svg
            width={18}
            height={18}
            style={{
              transform: `rotate(${-1 * viewState.bearing}deg)`,
            }}
          >
            <polygon className="fill-current" points="9,0 13,8 5,8" />
            <polygon className="fill-gray-300" points="9,18 13,10 5,10" />
          </svg>
        </button>
      </div>
    </MapControl>
  );
};

export default NavigationControl;
