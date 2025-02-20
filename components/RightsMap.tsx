"use client";

import { MapLayerMouseEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useState } from "react";
import Map, {
  MapStyle,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
  useMap,
} from "react-map-gl/maplibre";
import LayerMlBerlin from "./LayerMlBerlin";
import LayersControl from "./LayersControl/LayersControl";
import LocationAttributeCard from "./LocationAttributeCard";
import { useMapStateContext } from "./MapState/MapStateContext";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import SnowFlakeLayer from "./SnowflakeLayer";
import ZoomIndicator from "./ZoomIndicator";
import DataStateIndicator from "./data-state-indicator";
import MapDebugger from "./map-debugger";

type Props = {
  mapStyle: MapStyle;
};

const RightsMap: FC<Props> = ({ mapStyle }) => {
  const { rightsMap } = useMap();
  const [positionInfo, setPositionInfo] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    setPositionInfo({ ...event.point });
  }, []);

  const { viewState, setViewState, layers, setBounds } = useMapStateContext();
  const { tooltipInfo, setTooltipInfo } = useRightsExplorerContext();

  const handleMove = useCallback(
    (event: ViewStateChangeEvent) => {
      setViewState(event.viewState);
      setTooltipInfo(undefined);
    },
    [setViewState, setTooltipInfo],
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
      onMouseMove={onHover}
      onMove={handleMove}
      onMoveEnd={handleMoveEnd}
    >
      <NavigationControl />
      <ScaleControl />
      <div className="z-1 absolute right-[50px] mt-[10px] flex items-center gap-2">
        <DataStateIndicator />
        <MapDebugger />
        <ZoomIndicator />
        <LayersControl />
      </div>
      <SnowFlakeLayer />
      <LayerMlBerlin
        visibility={
          layers.find((d) => d.name === "Meilenblätter Berlin")?.visible
            ? "visible"
            : "none"
        }
      />
      {tooltipInfo && (
        <div
          className="pointer-events-none absolute z-50 rounded-md bg-white p-2 shadow-lg"
          style={{ left: positionInfo.x, top: positionInfo.y }}
        >
          <LocationAttributeCard
            placeName={tooltipInfo.placeName}
            locationAttribute={tooltipInfo.attribute}
          />
        </div>
      )}
    </Map>
  );
};

export default RightsMap;
