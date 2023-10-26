import MapStage from "../../components/MapStage";
import Navigation from "../../components/Navigation";
import RightsMap from "../../components/RightsMap";
import colorScaleAnsbach from "../../lib/colorScaleAnsbach";
import { getMapStyle } from "../../lib/getMapStyle";
import { loadAnsbachData } from "../../lib/loadAnsbachData";

export default async function Wp2() {
  const data = await loadAnsbachData();
  const style = await getMapStyle();

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
            <RightsMap data={data.features} style={style} />
          </MapStage>
        </div>
      </main>
    </>
  );
}
