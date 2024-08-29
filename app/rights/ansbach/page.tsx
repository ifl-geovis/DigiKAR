import Card from "@/components/Card";
import LegendNominal from "@/components/LegendNominal";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import RightsExplorer from "@/components/RightsExplorer";
import { RightRequest } from "@/components/RightsExplorer/RightsExplorerContext";
import RightsMap from "@/components/RightsMap";
import RightsMarkerConfig from "@/components/RightsMarkerConfig/RightsMarkerConfig";
import SearchBar from "@/components/SearchBar";
import colorMapAnsbach from "@/lib/colorMapAnsbach";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function Wp2() {
  const style = await getMapStyle();
  const symbolMap = new Map([["Dorf- und Gemeindeherrschaft", "square"]]);
  const rightsOrder = [
    "Dorf- und Gemeindeherrschaft", // equivalent to Landeshoheit
    "Grundherrschaft",
    "Kirchenhoheit",
    "Niedergericht",
    "Hochgericht",
  ];
  const rightRequest: RightRequest = {
    baseUrl: "/api/rights/ansbach",
  };

  return (
    <>
      <RightsExplorer
        timeRange={{ t: 1600, support: 50 }}
        rightRequest={rightRequest}
        attributeSet={new Set(rightsOrder)}
        initialBbox={[10.52, 49.25, 10.62, 49.35]}
        initialOrder={rightsOrder}
        initialSymbolMap={symbolMap}
        colorMap={colorMapAnsbach}
      >
        <MapViewLayout>
          <MapContainer>
            <RightsMap mapStyle={style} />
          </MapContainer>
          <MapAside>
            <Card>
              <MapTitle>Ansbach</MapTitle>
            </Card>
            <SearchBar />
            <RightsMarkerConfig />
            <Card title="Legende" collapsible>
              <LegendNominal />
            </Card>
          </MapAside>
        </MapViewLayout>
      </RightsExplorer>
    </>
  );
}
