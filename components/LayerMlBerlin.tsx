import { FC } from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { useMapStateContext } from "./MapState/MapStateContext";
import { useWmsCoordinates } from "@/hooks/useWmsCoordinates";

type Props = {
  visibility?: "visible" | "none";
};

const LayerMlBerlin: FC<Props> = ({ visibility }) => {
  const { bounds: boundsState } = useMapStateContext();
  const { coordinates, s, w, n, e } = useWmsCoordinates(boundsState);
  return (
    <Source
      coordinates={coordinates}
      type="image"
      url={`https://geoinformatik.htw-dresden.de/ms/mbl?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX=${s}%2C${w}%2C${n}%2C${e}&CRS=EPSG%3A4326&WIDTH=1080&HEIGHT=720&LAYERS=HISTWEB&STYLES=&FORMAT=image%2Fpng`}
    >
      <Layer
        layout={{
          visibility: visibility,
        }}
        paint={{
          "raster-opacity": 1,
          "raster-brightness-min": 0.5,
        }}
        id="meilenblaetter"
        type="raster"
      />
    </Source>
  );
};

export default LayerMlBerlin;
