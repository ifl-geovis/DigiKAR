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
import RightDetails from "@/components/right-details";
import colorMapKursachsen from "@/lib/colorMapKursachsen";
import { getMapStyle } from "@/lib/getMapStyle";
import { Right } from "@/types/PlaceProperties";

export default async function Wp2() {
  const attributeSet = new Set([
    "hochgericht",
    "niedergericht",
    "grundherrschaft",
    "landeshoheit",
    "verwaltungzugehörigkeit",
    "kirchenpatronat",
    "jagd",
  ]) as Set<Right>;

  const columns =
    "attested,rights_disputed_by,rights_held_by,rightholders_categories";
  const params = `select=*,grundherrschaft_summary(${columns}),hochgericht_summary(${columns}),niedergericht_summary(${columns}),verwaltungzugehoerigkeit_summary(${columns}),landeshoheit_summary(${columns}),jagd_summary(${columns}),kirchenpatronat_summary(${columns})&limit=200`;
  const style = await getMapStyle();
  const rightRequest: RightRequest = {
    baseUrl: "https://api.geohistoricaldata.org/digikar/rpc/orte.geojson",
    params,
    needsTransform: true,
  };
  const symbolMap = new Map();

  return (
    <RightsExplorer
      rightRequest={rightRequest}
      initialBbox={[13.2, 51.05, 13.3, 51.15]}
      attributeSet={attributeSet}
      initialOrder={[
        "hochgericht",
        "niedergericht",
        "grundherrschaft",
        "landeshoheit",
      ]}
      initialTimeRange={{ t: 1750, min: 1750 - 25, max: 1750 + 25 }}
      initialSymbolMap={symbolMap}
      colorMap={colorMapKursachsen}
      availableLayers={[{ name: "Meilenblätter Berlin", visible: false }]}
    >
      <MapViewLayout>
        <MapAside>
          <Card>
            <MapTitle>Kursachsen</MapTitle>
          </Card>
          <SearchBar />
          <RightsMarkerConfig />
          <Card title="Legende" collapsible>
            <LegendNominal />
          </Card>
        </MapAside>
        <MapContainer>
          <RightsMap mapStyle={style} />
        </MapContainer>
        <div className="z-10 p-2 grid-in-[bottom-nav]">
          <Timeline />
        </div>
      </MapViewLayout>
      <RightDetails />
    </RightsExplorer>
  );
}
