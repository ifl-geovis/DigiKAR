import { getAnwesen } from "@/lib/getAnwesen";
import MapStage from "../../../components/MapStage";
import AnwesenMap from "@/components/AnwesenMap";
import { getMapStyle } from "@/lib/getMapStyle";
import { Bbox } from "@/types/Bbox";
import MapState from "@/components/MapState";
import { mapToScale } from "@/lib/helpers";
import colorMapKursachsen from "@/lib/colorMapKursachsen";
import AnwesenMarker from "@/components/AnwesenMarker";

const center = { lng: 14.215, lat: 51.25 };
const bbox = [
  center.lng - 0.5,
  center.lat - 0.5,
  center.lng + 0.5,
  center.lat + 0.5,
] satisfies Bbox;

export default async function Anwesen() {
  const anwesen = await getAnwesen();
  const mapStyle = await getMapStyle();
  const colorScale = mapToScale(colorMapKursachsen, "lightgrey");

  return (
    <div className="grid grid-cols-[300px_auto] gap-5">
      <div>
        <h2>Anwesen in Höflein</h2>
        <div className="mb-5 flex items-center gap-3">
          <div className="text-sm">Grundherrschaft</div>
          <AnwesenMarker
            size={24}
            ng={{ isDisputed: false, isShared: false }}
            gs={{ isDisputed: false, isShared: false }}
          />
          <div className="text-sm">Niedergericht</div>
        </div>
        <ol className="flex flex-col gap-2">
          {colorScale.domain().map((d) => (
            <li
              key={d}
              className="flex cursor-pointer items-center gap-1 leading-tight transition-opacity"
            >
              <svg width={16} height={16} className="shrink-0">
                <circle
                  cx={8}
                  cy={8}
                  r={6.6}
                  stroke="black"
                  fill={colorScale(d)}
                />
              </svg>
              <div>{d}</div>
            </li>
          ))}
        </ol>
      </div>
      <MapStage className="h-[620px]">
        <MapState
          initialZoom={14}
          initialBbox={bbox}
          availableLayers={[{ name: "Meilenblätter Berlin", visible: false }]}
        >
          <AnwesenMap mapStyle={mapStyle} data={anwesen} />
        </MapState>
      </MapStage>
    </div>
  );
}
