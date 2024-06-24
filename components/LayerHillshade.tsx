import { FC } from "react";
import { Layer, Source } from "react-map-gl/maplibre";

const LayerHillshade: FC = () => {
  return (
    <Source
      attribution='© <a href="https://www.mapzen.com/rights">Mapzen</a>'
      id={"dem"}
      type={"raster-dem"}
      tiles={[
        "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
      ]}
      tileSize={256}
      minzoom={0}
      maxzoom={15}
    >
      <Layer
        type="hillshade"
        id="hillshade"
        source="dem"
        paint={{
          "hillshade-shadow-color": "rgb(200,200,200)",
          "hillshade-accent-color": "rgb(220,220,220)",
          "hillshade-exaggeration": 0.2,
        }}
      />
    </Source>
  );
};
export default LayerHillshade;
