import Card from "@/components/Card";
import LegendFooter from "@/components/legend-footer";
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
import HolderTypeToggle from "@/components/holder-type-toggle";
import MapControls from "@/components/map-controls";
import PerspectiveSelect from "@/components/perspective-select";
import RightDetails from "@/components/right-details";
import { ScrollArea } from "@/components/ui/scroll-area";
import colorMapCategories from "@/lib/color-map-categories";
import { getIndividualsDomain, getTopLevelDomain } from "@/lib/get-domains";
import { getMapStyle } from "@/lib/get-map-style";
import { rightSet } from "@/lib/right-set";

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
        { name: "Meilenblätter", id: ["meilenblaetter"], visible: false },
        {
          name: "Galgenstandorte",
          id: ["gallow", "gallow_label"],
          visible: false,
        },
        {
          name: "Flüsse Kursachsen",
          id: ["rivers_kursachsen"],
          visible: false,
        },
        { name: "Seen Kursachsen", id: ["lakes_kursachsen"], visible: false },
      ]}
    >
      <MapViewLayout>
        <MapAside>
          <SearchBar />
          <Card>
            <div className="space-y-4">
              <RightsMarkerConfig />
              <PerspectiveSelect />
              <HolderTypeToggle />
            </div>
          </Card>
          <Card inset={false} header={<span>Legende</span>} collapsible>
            <ScrollArea className="h-83 rounded">
              <div className="px-5 py-3">
                <LegendNominal />
              </div>
            </ScrollArea>
            <LegendFooter />
          </Card>
        </MapAside>
        <MapContainer>
          <RightsMap mapStyle={style} />
        </MapContainer>
        <div className="pointer-events-none z-10 pt-3 [grid-area:_map-area]">
          <MapControls />
        </div>
        <div className="z-10 p-2 [grid-area:_bottom-nav]">
          <Timeline />
        </div>
      </MapViewLayout>
      <RightDetails />
    </RightsExplorer>
  );
}
