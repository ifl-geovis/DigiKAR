import { LngLatBounds } from "maplibre-gl";
import useDebounce from "./useDebounce";

export const useWmsCoordinates = (bounds: LngLatBounds) => {
  const deboundcedBounds = useDebounce(bounds, 500);
  const coordinates = [
    deboundcedBounds.getNorthWest(),
    deboundcedBounds.getNorthEast(),
    deboundcedBounds.getSouthEast(),
    deboundcedBounds.getSouthWest(),
  ].map((d) => d.toArray()) as [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];

  const [n, e, s, w] = [
    deboundcedBounds.getNorth(),
    deboundcedBounds.getEast(),
    deboundcedBounds.getSouth(),
    deboundcedBounds.getWest(),
  ];

  return {
    coordinates,
    n,
    e,
    s,
    w,
  };
};
