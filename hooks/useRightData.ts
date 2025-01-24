import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";
import fetcher from "@/lib/fetcher";
import { GeneralizedApiRight } from "@/types/GeneralizedEndpoint";
import { PlacePropertiesGeneralized, Right } from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { LngLatBounds } from "maplibre-gl";
import useSWRImmutable from "swr/immutable";
import { kursachsenToRightSchema } from "../lib/kursachsenToRightSchema";
import useDebounce from "./useDebounce";

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
  rights: Right[],
  timeRange: TimeRange,
  bounds: LngLatBounds,
): {
  isLoading: boolean;
  data?: FeatureCollection<Point, PlacePropertiesGeneralized>;
  error: boolean;
} {
  const url = "https://api.geohistoricaldata.org/digikar/rpc/orte.geojson";

  const columns =
    "attested,rights_disputed_by,rights_held_by,rightholders_categories";
  const params = `select=*,${rights.map((d) => `${d}_summary(${columns})`)}&in_sample_regions=is.true`;
  const debouncedBBox = useDebounce<LngLatBounds>(bounds, 300);
  const request = `${url}?bbox={${toBbox(debouncedBBox)}}${params ? `&${params}` : ""}`;
  const { data, isLoading, error } = useSWRImmutable<GeneralizedApiRight>(
    request,
    fetcher,
    { keepPreviousData: true },
  );
  if (data) {
    return {
      isLoading,
      data: kursachsenToRightSchema(data, timeRange),
      error,
    };
  }
  return { error, isLoading, data };
}
