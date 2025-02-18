import AnwesenMap from "@/components/AnwesenMap";
import AnwesenMarker from "@/components/AnwesenMarker";
import Card from "@/components/Card";
import MapAside from "@/components/MapAside";
import MapContainer from "@/components/MapContainer";
import MapState from "@/components/MapState";
import MapTitle from "@/components/MapTitle";
import MapViewLayout from "@/components/MapViewLayout";
import colorMapKursachsen from "@/lib/colorMapKursachsen";
import { getAnwesen } from "@/lib/getAnwesen";
import { getMapStyle } from "@/lib/getMapStyle";
import { mapToScale } from "@/lib/helpers";
import { Bbox } from "@/types/Bbox";

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
    <MapViewLayout>
      <MapAside>
        <Card>
          <MapTitle>Anwesen in Höflein</MapTitle>
          <p>Rechteverteilung auf Ebene der Anwesen.</p>
        </Card>
        <Card title="Legende" collapsible>
          <div className="mb-5 flex items-center gap-3">
            <div className="text-sm">Grundherrschaft</div>
            <AnwesenMarker
              size={24}
              ng={{
                disputedBy: 0,
                heldBy: 0,
                categories: [],
                individuals: [],
                topLevels: [],
              }}
              gs={{
                disputedBy: 0,
                heldBy: 0,
                categories: [],
                individuals: [],
                topLevels: [],
              }}
            />
            <div className="text-sm">Niedergericht</div>
          </div>
          <ol className="flex flex-col gap-2 text-sm">
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
        </Card>
      </MapAside>
      <MapContainer>
        <MapState
          initialZoom={14}
          initialBbox={bbox}
          availableLayers={[{ name: "Meilenblätter Berlin", visible: false }]}
        >
          <AnwesenMap mapStyle={mapStyle} data={anwesen} />
        </MapState>
      </MapContainer>
    </MapViewLayout>
  );
}
