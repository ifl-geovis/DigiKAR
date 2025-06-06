import {
  TimeRange,
  useRightsExplorerContext,
} from "@/components/RightsExplorer/RightsExplorerContext";
import fetcher from "@/lib/fetcher";
import {
  PlacePropertiesWithPerspectives,
  Right,
} from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { LngLatBounds } from "maplibre-gl";
import useSWRImmutable from "swr/immutable";
import { toRightSchema } from "../lib/to-right-schema";
import useDebounce from "./useDebounce";
import { RightDefaultViewFeatureCollection } from "@/types/RightDefaultView";

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

  const columns = "attested_json,md_disputed_by,md_rights_held_by,rightholders";
  const params = `select=*,${rights.map((d) => `${d}(${columns})`)}&in_sample_regions=is.true`;
  const debouncedBBox = useDebounce<LngLatBounds>(bounds, 300);
  const request = `${url}?bbox={${toBbox(debouncedBBox)}}${params ? `&${params}` : ""}`;
  const { data, isLoading, error } =
    useSWRImmutable<RightDefaultViewFeatureCollection>(request, fetcher, {
      keepPreviousData: true,
    });
  if (data) {
    return {
      isLoading,
      data: toRightSchema(data, timeRange, showIndividuals),
      error,
    };
  }
  return { error, isLoading, data };
}
