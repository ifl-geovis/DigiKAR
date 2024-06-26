import RightsExplorer from "@/components/RightsExplorer";
import MapStage from "../../../components/MapStage";
import RightsMap from "../../../components/RightsMap";
import colorMapAnsbach from "../../../lib/colorMapAnsbach";
import { getMapStyle } from "../../../lib/getMapStyle";
import RightsMarkerConfig from "@/components/RightsMarkerConfig/RightsMarkerConfig";
import LegendNominal from "@/components/LegendNominal";
import SearchBar from "@/components/SearchBar";
import { RightRequest } from "@/components/RightsExplorer/RightsExplorerContext";

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
