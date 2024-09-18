import Card from "@/components/Card";
import LegendNominal from "@/components/LegendNominal/LegendNominal";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import RightsExplorer from "@/components/RightsExplorer";
import { RightRequest } from "@/components/RightsExplorer/RightsExplorerContext";
import RightsMap from "@/components/RightsMap";
import RightsMarkerConfig from "@/components/RightsMarkerConfig";
import SearchBar from "@/components/SearchBar";
import Timeline from "@/components/Timeline";
import colorMapKursachsen from "@/lib/colorMapKursachsen";
import { getMapStyle } from "@/lib/getMapStyle";
import getVoronoi from "@/lib/getVoronoi";

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
  const params = `select=*,grundherrschaft_summary(${columns}),hochgericht_summary(${columns}),niedergericht_summary(${columns}),verwaltungzugehoerigkeit_summary(${columns}),landeshoheit_summary(${columns}),jagd_summary(${columns}),kirchenpatronat_summary(${columns})&limit=200`;
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
      availableLayers={[
        { name: "Voronoi Ämter", visible: false },
        { name: "Meilenblätter Berlin", visible: false },
      ]}
    >
      <MapViewLayout>
        <MapAside>
          <Card>
            <MapTitle>Kursachsen</MapTitle>
          </Card>
          <SearchBar />
          <RightsMarkerConfig />
          <Card title="Legende" collapsible>
            <h3>Legende</h3>
            <LegendNominal />
          </Card>
        </MapAside>
        <MapContainer>
          <RightsMap mapStyle={style} borders={borders} />
        </MapContainer>
        <div className="z-10 p-2 grid-in-[bottom-nav]">
          <Timeline />
        </div>
      </MapViewLayout>
    </RightsExplorer>
  );
}
