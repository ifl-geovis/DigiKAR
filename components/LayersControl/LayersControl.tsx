import { FC } from "react";
import { RxEyeClosed, RxEyeOpen, RxLayers } from "react-icons/rx";
import MapControl from "../MapControl";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMapStateContext } from "../MapState/MapStateContext";

const LayersControl: FC = () => {
  const { layers, setLayers } = useMapStateContext();
  return (
    <MapControl>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="h-full"
            disabled={!layers.length}
            size={"icon"}
            variant={"ghost"}
          >
            <RxLayers />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto text-sm" align="end">
          <div className="mb-2 text-xs font-bold">Kartenebenen</div>
          <ul>
            {layers.map((layer) => (
              <li key={layer.name} className="flex items-center gap-3">
                <Button
                  className="h-auto p-2"
                  variant="ghost"
                  onClick={() => {
                    setLayers(
                      layers.map((l) =>
                        l.name === layer.name
                          ? { ...l, visible: !l.visible }
                          : l,
                      ),
                    );
                  }}
                >
                  {layer.visible ? <RxEyeOpen /> : <RxEyeClosed />}
                </Button>
                {layer.name}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </MapControl>
  );
};

export default LayersControl;
