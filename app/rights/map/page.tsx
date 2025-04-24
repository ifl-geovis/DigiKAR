import Card from "@/components/Card";
import LegendNominal from "@/components/LegendNominal/LegendNominal";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapViewLayout from "@/components/MapViewLayout";
import RightsExplorer from "@/components/RightsExplorer";
import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";
import RightsMap from "@/components/RightsMap";
import RightsMarkerConfig from "@/components/RightsMarkerConfig";
import SearchBar from "@/components/SearchBar";
import Timeline from "@/components/Timeline";
import PerspectiveSelect from "@/components/perspective-select";
import RightDetails from "@/components/right-details";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      initialTimeRange={{ t: 1800, min: 1800 - 25, max: 1800 + 25 }}
      initialSymbolMap={symbolMap}
      availableLayers={[
        { name: "Meilenblätter", visible: false },
        { name: "Galgenstandorte", visible: true },
      ]}
    >
      <MapViewLayout>
        <MapAside>
          <SearchBar />
          <Card>
            <PerspectiveSelect />
          </Card>
          <RightsMarkerConfig />
          <Card inset={false} title="Legende" collapsible>
            <ScrollArea className="h-64 rounded">
              <div className="px-5 py-3">
                <LegendNominal />
              </div>
            </ScrollArea>
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
