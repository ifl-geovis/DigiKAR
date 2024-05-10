import { GeneralizedApiRight } from "@/types/GeneralizedEndpoint";
import { PlacePropertiesGeneralized } from "@/types/PlaceProperties";
import { FeatureCollection, Point } from "geojson";
import { LngLatBounds } from "maplibre-gl";
import useSWRImmutable from "swr/immutable";
import useDebounce from "./useDebounce";
import fetcher from "@/lib/fetcher";
import { toRightSchema } from "../lib/toRightSchema";

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
  year: number,
  bounds: LngLatBounds,
): {
  isLoading: boolean;
  data?: FeatureCollection<Point, PlacePropertiesGeneralized>;
  error: boolean;
} {
  const debouncedBBox = useDebounce<LngLatBounds>(bounds, 300);
  const joinColumns =
    "attested,rights_disputed_by,rights_held_by,rightholders_categories";
  const url = `
    https://api.geohistoricaldata.org/digikar/rpc/orte.geojson?bbox={${toBbox(debouncedBBox)?.join(",")}}&select=*,grundherrschaft_summary(${joinColumns}),hochgericht_summary(${joinColumns}),niedergericht_summary(${joinColumns}),verwaltungzugehoerigkeit_summary(${joinColumns}),landeshoheit_summary(${joinColumns}),jagd_summary(${joinColumns}),kirchenpatronat_summary(${joinColumns})&limit=100
  `;
  // const url =
  //   "https://api.geohistoricaldata.org/digikar/rpc/orte.geojson?bbox={9.814196500706885,16.066128157707652,49.87150859189376,51.91228936530018}&select=*,grundherrschaft_summary(attested,rights_disputed_by, rights_held_by, rightholders_categories),hochgericht_summary(*),niedergericht_summary(*),verwaltungzugehoerigkeit_summary(*),landeshoheit_summary(*),jagd_summary(*),kirchenpatronat(*)&label=eq.Michaelis,%20St.";
  const { data, isLoading, error } = useSWRImmutable<GeneralizedApiRight>(
    url,
    fetcher,
    { keepPreviousData: true },
  );
  if (data) {
    const transformedData = toRightSchema(data, year);
    return { isLoading, data: transformedData, error };
  }
  return { error, isLoading, data };
}
