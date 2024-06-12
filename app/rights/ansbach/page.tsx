import RightsExplorer from "@/components/RightsExplorer";
import MapStage from "../../../components/MapStage";
import RightsMap from "../../../components/RightsMap";
import colorMapAnsbach from "../../../lib/colorMapAnsbach";
import { getMapStyle } from "../../../lib/getMapStyle";
import { loadAnsbachData } from "../../../lib/loadAnsbachData";
import { TbDatabaseX } from "react-icons/tb";
import RightsMarkerConfig from "@/components/RightsMarkerConfig/RightsMarkerConfig";
import LegendNominal from "@/components/LegendNominal";
import SearchBar from "@/components/SearchBar";

export default async function Wp2() {
  const data = await (async () => {
    try {
      return await loadAnsbachData();
    } catch (error) {
      return;
    }
  })();
  const style = await getMapStyle();
  const symbolMap = new Map([["Dorf- und Gemeindeherrschaft", "square"]]);
  const rightsOrder = [
    "Dorf- und Gemeindeherrschaft", // equivalent to Landeshoheit
    "Grundherrschaft",
    "Kirchenhoheit",
    "Niedergericht",
    "Hochgericht",
  ];

  return (
    <>
      <RightsExplorer
        data={data?.features}
        initialOrder={rightsOrder}
        initialSymbolMap={symbolMap}
        colorMap={colorMapAnsbach}
      >
        <div className="grid grid-cols-[350px_auto] gap-5">
          <div>
            <h2>Ansbach</h2>
            <h3>Rechteverteilung</h3>
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
            {data ? (
              <RightsMap mapStyle={style} />
            ) : (
              <div className="grid h-full grid-cols-1 items-center bg-gray-50">
                <div className="flex flex-col items-center">
                  <TbDatabaseX />
                  <h2 className="text-base font-bold">No data available</h2>
                  <p className="max-w-md">
                    Aus rechtlichen Gründen können wir die Daten für Ansbach
                    nicht online verfügbar machen.
                  </p>
                </div>
              </div>
            )}
          </MapStage>
        </div>
      </RightsExplorer>
    </>
  );
}
