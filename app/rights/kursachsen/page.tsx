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
  const style = await getMapStyle();
  const borders = await getVoronoi();
  const symbolMap = new Map();

  return (
    <RightsExplorer
      initialBbox={[13.3, 51.0, 14.0, 51.2]}
      attributeSet={attributeSet}
      initialOrder={[
        "Hochgericht",
        "Niedergericht",
        "Grundherrschaft",
        "Landeshoheit",
      ]}
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
