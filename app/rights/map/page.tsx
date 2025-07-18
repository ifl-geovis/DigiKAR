import Card from "@/components/Card";
import HolderTypeToggle from "@/components/holder-type-toggle";
import LegendFooter from "@/components/legend-footer";
import LegendNominal from "@/components/LegendNominal/LegendNominal";
import MapControls from "@/components/map-controls";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapViewLayout from "@/components/MapViewLayout";
import PerspectiveSelect from "@/components/perspective-select";
import RightDetails from "@/components/right-details";
import RightsExplorer from "@/components/RightsExplorer";
import RightsMap from "@/components/RightsMap";
import RightsMarkerConfig from "@/components/RightsMarkerConfig";
import SearchBar from "@/components/SearchBar";
import Timeline from "@/components/Timeline";
import { ScrollArea } from "@/components/ui/scroll-area";
import colorMapCategories from "@/lib/color-map-categories";
import { getIndividualsDomain, getTopLevelDomain } from "@/lib/get-domains";
import { getMapStyle } from "@/lib/get-map-style";
import { rightSet } from "@/lib/right-set";
import { ColorMaps } from "@/types/ColorMaps";

export default async function Rights() {
  const style = await getMapStyle("rights");
  const colorMapTopLevels = await getTopLevelDomain();
  const colorMapIndividualsCorporation =
    await getIndividualsDomain("Körperschaft");
  const colorMapIndividualsPerson = await getIndividualsDomain("Person");
  const colorMaps: ColorMaps = [
    { perspective: "categories", colorMap: colorMapCategories },
    { perspective: "topLevels", colorMap: colorMapTopLevels },
    {
      perspective: "individuals",
      type: "Körperschaft",
      colorMap: colorMapIndividualsCorporation,
    },
    {
      perspective: "individuals",
      type: "Person",
      colorMap: colorMapIndividualsPerson,
    },
  ];
  const symbolMap = new Map();

  return (
    <RightsExplorer
      initialViewState={{ longitude: 13.73, latitude: 51.05, zoom: 10 }}
      attributes={rightSet}
      initialOrder={[
        "hochgericht_gemeinde",
        "niedergericht",
        "grundherrschaft",
        "landeshoheit",
      ]}
      colorMaps={colorMaps}
      initialTimeRange={{ t: 1800, min: 1800 - 25, max: 1800 + 25 }}
      initialSymbolMap={symbolMap}
      availableLayers={[
        {
          name: "Meilenblätter",
          id: ["meilenblaetter", "meilenblaetterDummy"],
          visible: false,
        },
        {
          name: "Galgenstandorte",
          id: ["gallow", "gallowLabels"],
          visible: false,
        },
        {
          name: "Flüsse Kursachsen",
          id: ["riversKursachsen"],
          visible: false,
        },
        { name: "Seen Kursachsen", id: ["lakesKursachsen"], visible: false },
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
