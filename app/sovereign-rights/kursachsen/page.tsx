import getElectoralSaxonyData from "@/lib/getElectoralSaxonyData";
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
  const data = await getElectoralSaxonyData();
  const style = await getMapStyle();
  const borders = await getVoronoi();
  const symbolMap = new Map();

  return (
    <RightsExplorer
      data={data}
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
              <h3>Legend</h3>
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
