"use client";

import useRightData from "@/hooks/useRightData";
import { mapToScale } from "@/lib/helpers";
import { FC, useCallback, useEffect } from "react";
import { Marker } from "react-map-gl/maplibre";
import { useMapStateContext } from "./MapState/MapStateContext";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import RightsMarker from "./RightsMarker";

const SnowFlakeLayer: FC = () => {
  const { order, timeRange, colorScale, symbolMap, setDataState } =
    useRightsExplorerContext();
  const { bounds } = useMapStateContext();

  const symbolScale = useCallback(
    () => mapToScale(symbolMap, "circle"),
    [symbolMap],
  );

  const {
    data: transformedData,
    isLoading,
    error,
  } = useRightData(order, timeRange, bounds);

  useEffect(() => {
    setDataState({ isLoading, error });
  }, [isLoading, error, setDataState]);

  return (
    <>
      {transformedData?.features.map((d, idx) => {
        const radius = 20;
        const markerSize = radius * 2 + 3 * 6;
        return (
          <Marker
            key={idx}
            longitude={d.geometry.coordinates[0]}
            latitude={d.geometry.coordinates[1]}
          >
            <svg width={markerSize} height={markerSize}>
              <g transform={`translate(${markerSize / 2} ${markerSize / 2})`}>
                <RightsMarker
                  placeId={d.properties.id}
                  placeName={d.properties?.placeName}
                  placeAttributes={d.properties?.attributes}
                  radius={radius}
                  symbolScale={symbolScale()}
                  colorScale={colorScale}
                  rightOrder={order}
                />
              </g>
            </svg>
          </Marker>
        );
      })}
    </>
  );
};

export default SnowFlakeLayer;
