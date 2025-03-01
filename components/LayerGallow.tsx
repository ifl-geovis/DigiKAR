import { FC } from "react";
import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  visibility?: "visible" | "none";
};

const LayerGallow: FC<Props> = ({ visibility }) => {
  return (
    <Source
      type="vector"
      url="https://tiles.geohistoricaldata.org/tiles/richtstaetten"
    >
      <Layer
        id="gallow"
        type="symbol"
        source-layer="richtstaetten"
        layout={{
          visibility: visibility,
          "icon-image": "gallow",
          "icon-allow-overlap": true,
        }}
        paint={{
          "icon-color": "rgb(100,60,0)",
          "icon-halo-color": "rgb(255,255,255)",
          "icon-halo-width": 5,
        }}
      />
      <Layer
        id="gallow-labels"
        type="symbol"
        source-layer="richtstaetten"
        layout={{
          visibility: visibility,
          "text-field": "{ort}",
          "text-font": ["Inter Bold Italic"],
          "text-size": 12,
          "text-anchor": "bottom-left",
          "text-offset": [0, 1],
        }}
        minzoom={8}
        paint={{
          "text-color": "rgb(100,100,100)",
          "text-halo-color": "rgb(255,255,255)",
          "text-halo-width": 2,
          "text-halo-blur": 5,
        }}
      />
    </Source>
  );
};

export default LayerGallow;
