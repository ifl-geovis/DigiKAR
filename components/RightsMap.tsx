"use client";

import { MapLayerMouseEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { FC, useCallback, useState } from "react";
import Map, {
  AttributionControl,
  ScaleControl,
  StyleSpecification,
  ViewStateChangeEvent,
  useMap,
} from "react-map-gl/maplibre";
import LayerGallow from "./LayerGallow";
import LayerMlBerlin from "./LayerMlBerlin";
import LocationAttributeCard from "./LocationAttributeCard";
import { useMapStateContext } from "./MapState/MapStateContext";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import SnowFlakeLayer from "./SnowflakeLayer";

type Props = {
  mapStyle: StyleSpecification;
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
      maxZoom={16}
      mapStyle={mapStyle}
      onMouseMove={onHover}
      onMove={handleMove}
      onMoveEnd={handleMoveEnd}
      attributionControl={false}
    >
      <AttributionControl compact={true} position="top-right" />
      <ScaleControl position="top-right" />
      <SnowFlakeLayer />
      <LayerMlBerlin
        visibility={
          layers.find((d) => d.name === "Meilenblätter")?.visible
            ? "visible"
            : "none"
        }
      />
      <LayerGallow
        visibility={
          layers.find((d) => d.name === "Galgenstandorte")?.visible
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
