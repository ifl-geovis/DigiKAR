"use client";

import { MapGeoJSONFeature, MapLayerMouseEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useState } from "react";
import Map, {
  MapStyle,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
  useMap,
} from "react-map-gl/maplibre";
import ZoomIndicator from "./ZoomIndicator";
import LayersControl from "./LayersControl/LayersControl";
import { useMapStateContext } from "./MapState/MapStateContext";
import SnowFlakeLayer from "./SnowflakeLayer";
import LayerMlBerlin from "./LayerMlBerlin";

type Props = {
  mapStyle: MapStyle;
};

const RightsMap: FC<Props> = ({ mapStyle }) => {
  const { rightsMap } = useMap();
  const [hoverInfo, setHoverInfo] = useState<
    | {
        feature: MapGeoJSONFeature;
        x: number;
        y: number;
      }
    | undefined
  >(undefined);

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
  }, []);

  const { viewState, setViewState, layers, setBounds } = useMapStateContext();

  const handleMove = useCallback(
    (event: ViewStateChangeEvent) => {
      setViewState(event.viewState);
    },
    [setViewState],
  );

  const handleMoveEnd = useCallback(() => {
    const bounds = rightsMap?.getBounds();
    if (bounds) setBounds(bounds);
  }, [rightsMap, setBounds]);

  return (
    <Map
      id="rightsMap"
      initialViewState={viewState}
      minZoom={4}
      mapStyle={mapStyle}
      interactiveLayerIds={["borders"]}
      onMouseMove={onHover}
      onMouseOut={() => setHoverInfo(undefined)}
      onMove={handleMove}
      onMoveEnd={handleMoveEnd}
    >
      <NavigationControl />
      <ScaleControl position="bottom-right" />
      <div className="z-1 absolute right-[50px] mt-[10px] flex items-center gap-2">
        <LayersControl />
        <ZoomIndicator />
      </div>
      <SnowFlakeLayer />
      <LayerMlBerlin
        visibility={
          layers.find((d) => d.name === "Meilenblätter Berlin")?.visible
            ? "visible"
            : "none"
        }
      />
      {hoverInfo && (
        <div
          className="pointer-events-none absolute rounded-md bg-white p-2 shadow-lg"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>Amt: {hoverInfo.feature.properties?.amt}</div>
        </div>
      )}
    </Map>
  );
};

export default RightsMap;
