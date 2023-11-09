import {
  BackgroundLayerSpecification,
  LayerSpecification,
  StyleSpecification,
} from "maplibre-gl";
import useSWRImmutable from "swr/immutable";
import fetcher from "../lib/fetcher";

const useCustomBasemapStyle = () => {
  const url =
    "https://basemap.de/data/produkte/web_vektor/styles/bm_web_bin.json";

  const { data, error, isLoading } = useSWRImmutable(url, fetcher);

  const originalStyle = data as StyleSpecification;

  const hasSourceLayer = (
    layer: LayerSpecification
  ): layer is Exclude<LayerSpecification, BackgroundLayerSpecification> =>
    "source-layer" in layer == true;

  const newLayers =
    !isLoading &&
    originalStyle.layers
      .filter(
        (d) =>
          !hasSourceLayer(d) ||
          (hasSourceLayer(d) &&
            d["source-layer"] &&
            !d["source-layer"].match(/Verkehrs/))
      )
      .map((d) => {
        const newPaintProperties =
          d.type == "fill"
            ? { "fill-opacity": 0.1 }
            : d.type == "circle"
            ? { "circle-opacity": 0.4 }
            : d.type == "line"
            ? { "line-opacity": 0.1 }
            : d.type == "symbol"
            ? { "text-opacity": 0.4, "icon-opacity": 0.4 }
            : d.type == "raster"
            ? { "raster-opacity": 0.2 }
            : {};
        return {
          ...d,
          paint: { ...d.paint, ...newPaintProperties },
        };
      });
  const newStyle = {
    ...originalStyle,
    layers: newLayers,
  } as StyleSpecification;
  const style = isLoading ? url : newStyle;

  return {
    style,
    isLoading,
    isError: error,
  };
};

export default useCustomBasemapStyle;
