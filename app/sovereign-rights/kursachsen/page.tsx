import getElectoralSaxonyData from "@/lib/getElectoralSaxonyData";
import MapStage from "../../../components/MapStage";
import RightsMap from "../../../components/RightsMap";
import { getMapStyle } from "../../../lib/getMapStyle";
import getVoronoi from "@/lib/getVoronoi";
import RightsExplorer from "@/components/RightsExplorer";
import colorMapAnsbach from "@/lib/colorMapAnsbach";
import RightsMarkerConfig from "@/components/RightsMarkerConfig";
import SearchBar from "@/components/SearchBar";

export default async function Wp2() {
  const data = await getElectoralSaxonyData();
  const style = await getMapStyle();
  const borders = await getVoronoi();
  const symbolMap = new Map();

  return (
    <>
      <RightsExplorer
        data={data}
        initialSymbolMap={symbolMap}
        colorMap={colorMapAnsbach}
      >
        <div className="grid grid-cols-[350px_auto] gap-5">
          <div>
            <h2>Kursachsen</h2>
            <h3>Rights and potentates</h3>
            <div className="flex flex-col gap-3">
              <SearchBar />
              <RightsMarkerConfig />
              <div>
                <h3>Legend</h3>
                <p className="italic">to be defined</p>
              </div>
            </div>
          </div>
          <MapStage>
            <RightsMap mapStyle={style} borders={borders} />
          </MapStage>
        </div>
      </RightsExplorer>
    </>
  );
}
