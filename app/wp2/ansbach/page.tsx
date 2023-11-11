import MapStage from "../../../components/MapStage";
import Navigation from "../../../components/Navigation";
import RightsMap from "../../../components/RightsMap";
import colorScaleAnsbach from "../../../lib/colorScaleAnsbach";
import { getMapStyle } from "../../../lib/getMapStyle";
import { loadAnsbachData } from "../../../lib/loadAnsbachData";
import { TbDatabaseX } from "react-icons/tb";

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

  return (
    <>
      <Navigation />
      <main className="p-10">
        <div className="grid grid-cols-[350px_auto] gap-5">
          <div>
            <h2>Ansbach</h2>
            <h3>Rights and potentates</h3>
            <div className="mt-3">
              <h3>Legend</h3>
              <ol>
                {colorScaleAnsbach.domain().map((d) => (
                  <li key={d} className="flex items-center">
                    <svg width={"1em"} height={"1em"} className="inline mr-3">
                      <circle
                        cx={".5em"}
                        cy={".5em"}
                        r={".5em"}
                        fill={colorScaleAnsbach(d)}
                      />
                    </svg>
                    <div>{d}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <MapStage>
            {data ? (
              <RightsMap
                data={data.features}
                mapStyle={style}
                rightsOrder={[
                  "Dorf- und Gemeindeherrschaft", // equivalent to Landeshoheit
                  "Grundherrschaft",
                  "Kirchenhoheit",
                  "Niedergericht",
                  "Hochgericht",
                ]}
                rightsSymbolMap={symbolMap}
              />
            ) : (
              <div className="grid grid-cols-1 items-center h-full bg-gray-50">
                <div className="flex flex-col items-center">
                  <TbDatabaseX />
                  <h2 className="text-base font-bold">No data available</h2>
                  <p className="max-w-md">
                    Due to limited access policy from our project partners we
                    are not able to share and show all data publicly.
                  </p>
                </div>
              </div>
            )}
          </MapStage>
        </div>
      </main>
    </>
  );
}
