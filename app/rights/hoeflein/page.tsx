import { getAnwesen } from "@/lib/getAnwesen";
import MapStage from "../../../components/MapStage";
import AnwesenMap from "@/components/AnwesenMap";
import { getMapStyle } from "@/lib/getMapStyle";
import { Bbox } from "@/types/Bbox";
import MapState from "@/components/MapState";

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

  return (
    <div className="grid grid-cols-[250px_auto] gap-5">
      <div>
        <h2>Anwesen in Höflein</h2>
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
