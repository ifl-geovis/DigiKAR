import Card from "@/components/Card";
import LegendNominal from "@/components/LegendNominal/LegendNominal";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import RightsExplorer from "@/components/RightsExplorer";
import RightsMap from "@/components/RightsMap";
import RightsMarkerConfig from "@/components/RightsMarkerConfig";
import SearchBar from "@/components/SearchBar";
import Timeline from "@/components/Timeline";
import PerspectiveSelect from "@/components/perspective-select";
import RightDetails from "@/components/right-details";
import colorMapKursachsen from "@/lib/colorMapKursachsen";
import { getMapStyle } from "@/lib/getMapStyle";
import { rightSet } from "@/lib/rightSet";

export default async function Wp2() {
  const style = await getMapStyle();
  const symbolMap = new Map();

  return (
    <RightsExplorer
      initialBbox={[13.25 - 0.5, 51.125 - 0.2, 13.25 + 0.5, 51.125 + 0.2]}
      attributes={rightSet}
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
            <MapTitle>Rechteverteilung</MapTitle>
          </Card>
          <SearchBar />
          <Card>
            <PerspectiveSelect />
          </Card>
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
