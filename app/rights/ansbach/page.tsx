import RightsExplorer from "@/components/RightsExplorer";
import MapStage from "../../../components/MapStage";
import RightsMap from "../../../components/RightsMap";
import colorMapAnsbach from "../../../lib/colorMapAnsbach";
import { getMapStyle } from "../../../lib/getMapStyle";
import RightsMarkerConfig from "@/components/RightsMarkerConfig/RightsMarkerConfig";
import LegendNominal from "@/components/LegendNominal";
import SearchBar from "@/components/SearchBar";

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
  const fetcher = {
    baseUrl: "/api/rights/ansbach",
  };

  return (
    <>
      <RightsExplorer
        fetcher={fetcher}
        attributeSet={new Set(rightsOrder)}
        initialBbox={[10.4, 49.1, 10.6, 49.3]}
        initialOrder={rightsOrder}
        initialSymbolMap={symbolMap}
        colorMap={colorMapAnsbach}
      >
        <div className="grid grid-cols-[350px_auto] gap-5">
          <div>
            <h2>Ansbach</h2>
            <div className="flex flex-col gap-3">
              <SearchBar />
              <RightsMarkerConfig />
              <div>
                <h3>Legende</h3>
                <LegendNominal />
              </div>
            </div>
          </div>
          <MapStage>
            <RightsMap mapStyle={style} />
          </MapStage>
        </div>
      </RightsExplorer>
    </>
  );
}
