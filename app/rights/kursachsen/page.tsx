import MapStage from "../../../components/MapStage";
import RightsMap from "../../../components/RightsMap";
import { getMapStyle } from "../../../lib/getMapStyle";
import getVoronoi from "@/lib/getVoronoi";
import RightsExplorer from "@/components/RightsExplorer";
import RightsMarkerConfig from "@/components/RightsMarkerConfig";
import SearchBar from "@/components/SearchBar";
import LegendNominal from "@/components/LegendNominal/LegendNominal";
import colorMapKursachsen from "@/lib/colorMapKursachsen";
import Timeline from "@/components/Timeline";
import { RightRequest } from "@/components/RightsExplorer/RightsExplorerContext";

export default async function Wp2() {
  const attributeSet = new Set([
    "Hochgericht",
    "Niedergericht",
    "Grundherrschaft",
    "Landeshoheit",
    "Verwaltungzugehörigkeit",
    "Kirchenpatronat",
    "Jagd",
  ]);

  const columns =
    "attested,rights_disputed_by,rights_held_by,rightholders_categories";
  const params = `select=*,grundherrschaft_summary(attested,rights_disputed_by,rights_held_by,rightholders_categories),hochgericht_summary(${columns}),niedergericht_summary(${columns}),verwaltungzugehoerigkeit_summary(${columns}),landeshoheit_summary(${columns}),jagd_summary(${columns}),kirchenpatronat_summary(${columns})&limit=100`;
  const style = await getMapStyle();
  const rightRequest: RightRequest = {
    baseUrl: "https://api.geohistoricaldata.org/digikar/rpc/orte.geojson",
    params,
    needsTransform: true,
  };
  const borders = await getVoronoi();
  const symbolMap = new Map();

  return (
    <RightsExplorer
      rightRequest={rightRequest}
      initialBbox={[13.6, 51.05, 13.7, 51.15]}
      attributeSet={attributeSet}
      initialOrder={[
        "Hochgericht",
        "Niedergericht",
        "Grundherrschaft",
        "Landeshoheit",
      ]}
      timeRange={{ t: 1700, support: 75 }}
      initialSymbolMap={symbolMap}
      colorMap={colorMapKursachsen}
      availableLayers={[{ name: "Borders", visible: false }]}
    >
      <div className="grid grid-cols-[350px_auto] gap-5">
        <div>
          <h2>Kursachsen</h2>
          <div className="flex flex-col gap-3">
            <SearchBar />
            <RightsMarkerConfig />
            <div>
              <h3>Legende</h3>
              <LegendNominal />
            </div>
          </div>
        </div>
        <MapStage className="h-[500px]">
          <RightsMap mapStyle={style} borders={borders} />
          <Timeline />
        </MapStage>
      </div>
    </RightsExplorer>
  );
}
