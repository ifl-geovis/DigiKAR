import { FC } from "react";
import { RxEyeClosed, RxEyeOpen, RxLayers } from "react-icons/rx";
import MapControl from "../MapControl";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";

const LayersControl: FC = () => {
  const { layers, setLayers } = useRightsExplorerContext();
  return (
    <MapControl>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <RxLayers />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="font-bold">Layers</div>
          <ul>
            {layers.map((layer) => (
              <li key={layer.name} className="my-3 flex items-center gap-5">
                {layer.visible ? <RxEyeOpen /> : <RxEyeClosed />}
                <Button
                  size="sm"
                  variant="ghost"
                  className="grow"
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
                  Borders
                </Button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </MapControl>
  );
};

export default LayersControl;
