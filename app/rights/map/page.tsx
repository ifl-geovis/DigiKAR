import Card from "@/components/Card";
import LegendNominal from "@/components/LegendNominal/LegendNominal";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import RightsExplorer from "@/components/RightsExplorer";
import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";
import RightsMap from "@/components/RightsMap";
import RightsMarkerConfig from "@/components/RightsMarkerConfig";
import Timeline from "@/components/Timeline";
import PerspectiveSelect from "@/components/perspective-select";
import RightDetails from "@/components/right-details";
import colorMapCategories from "@/lib/colorMapCategories";
import { getIndividualsDomain, getTopLevelDomain } from "@/lib/getDomains";
import { getMapStyle } from "@/lib/getMapStyle";
import { rightSet } from "@/lib/rightSet";

export default async function Rights() {
  const style = await getMapStyle();
  const colorMapTopLevels = await getTopLevelDomain();
  const colorMapIndividuals = await getIndividualsDomain();
  const colorMaps = new Map<Perspective, Map<string, string>>([
    ["categories", colorMapCategories],
    ["topLevels", colorMapTopLevels],
    ["individuals", colorMapIndividuals],
  ]);
  const symbolMap = new Map();

  return (
    <RightsExplorer
      initialViewState={{ longitude: 13.73, latitude: 51.05, zoom: 10 }}
      attributes={rightSet}
      initialOrder={[
        "hochgericht",
        "niedergericht",
        "grundherrschaft",
        "landeshoheit",
      ]}
      colorMaps={colorMaps}
      initialTimeRange={{ t: 1750, min: 1750 - 25, max: 1750 + 25 }}
      initialSymbolMap={symbolMap}
      availableLayers={[{ name: "Meilenblätter Berlin", visible: false }]}
    >
      <MapViewLayout>
        <MapAside>
          <Card>
            <MapTitle>Rechteverteilung</MapTitle>
          </Card>
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
        <div className="z-10 p-2 [grid-area:_bottom-nav]">
          <Timeline />
        </div>
      </MapViewLayout>
      <RightDetails />
    </RightsExplorer>
  );
}
