import { GeneralizedApiRight } from "@/types/GeneralizedEndpoint";
import { PlacePropertiesGeneralized } from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { LngLatBounds } from "maplibre-gl";
import useSWRImmutable from "swr/immutable";
import useDebounce from "./useDebounce";
import fetcher from "@/lib/fetcher";
import { kursachsenToRightSchema } from "../lib/kursachsenToRightSchema";
import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";

const toBbox = (bounds?: LngLatBounds) => {
  if (!bounds) return undefined;
  return [
    bounds.getWest(),
    bounds.getEast(),
    bounds.getSouth(),
    bounds.getNorth(),
  ];
};

export default function useRightData(
  url: { baseUrl: string; params?: string; needsTransform?: boolean },
  timeRange: TimeRange,
  bounds: LngLatBounds,
): {
  isLoading: boolean;
  data?: FeatureCollection<Point, PlacePropertiesGeneralized>;
  error: boolean;
} {
  const debouncedBBox = useDebounce<LngLatBounds>(bounds, 300);
  const request = `${url.baseUrl}?bbox={${toBbox(debouncedBBox)}}${url.params ? `&${url.params}` : ""}`;
  const { data, isLoading, error } = useSWRImmutable<GeneralizedApiRight>(
    request,
    fetcher,
    { keepPreviousData: true },
  );
  if (data) {
    return {
      isLoading,
      //@ts-expect-error Should the data returned from the apis be a generic? useRightData<T>()?
      data: url.needsTransform
        ? kursachsenToRightSchema(data, timeRange)
        : data,
      error,
    };
  }
  return { error, isLoading, data };
}
