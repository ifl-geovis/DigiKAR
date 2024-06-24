import { FeatureCollection, GeoJsonProperties, MultiPolygon } from "geojson";
import { FC } from "react";
import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  borders: FeatureCollection<MultiPolygon, GeoJsonProperties>;
  visibility?: "visible" | "none";
};

const BorderLayer: FC<Props> = ({ borders, visibility }) => {
  return (
    <Source type="geojson" data={borders}>
      <Layer
        id="borders"
        type="fill"
        paint={{ "fill-opacity": 0 }}
        layout={{ visibility }}
      />
      <Layer
        id="borders-outline-blur"
        type="line"
        layout={{ "line-join": "round", visibility }}
        paint={{
          "line-blur": 100,
          "line-color": "grey",
          "line-width": 20,
        }}
      />
      <Layer
        id="borders-outline"
        type="line"
        layout={{ "line-join": "round", visibility }}
        paint={{ "line-color": "grey", "line-width": 1 }}
      />
    </Source>
  );
};

export default BorderLayer;
