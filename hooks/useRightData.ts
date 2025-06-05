import {
  TimeRange,
  useRightsExplorerContext,
} from "@/components/RightsExplorer/RightsExplorerContext";
import fetcher from "@/lib/fetcher";
import { SummaryViewRights } from "@/types/SummaryView";
import {
  PlacePropertiesWithPerspectives,
  Right,
} from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { LngLatBounds } from "maplibre-gl";
import useSWRImmutable from "swr/immutable";
import { toRightSchema } from "../lib/to-right-schema";
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
  data?: FeatureCollection<Point, PlacePropertiesWithPerspectives>;
  error: boolean;
} {
  const url = "https://api.geohistoricaldata.org/digikar/rpc/orte.geojson";

  const { showIndividuals } = useRightsExplorerContext();

  const columns =
    "attested,rights_disputed_by,rights_held_by,rightholders_individuals";
  const params = `select=*,${rights.map((d) => `${d}_summary(${columns})`)}&in_sample_regions=is.true`;
  const debouncedBBox = useDebounce<LngLatBounds>(bounds, 300);
  const request = `${url}?bbox={${toBbox(debouncedBBox)}}${params ? `&${params}` : ""}`;
  const { data, isLoading, error } = useSWRImmutable<SummaryViewRights>(
    request,
    fetcher,
    { keepPreviousData: true },
  );
  if (data) {
    return {
      isLoading,
      data: toRightSchema(data, timeRange, showIndividuals),
      error,
    };
  }
  return { error, isLoading, data };
}
