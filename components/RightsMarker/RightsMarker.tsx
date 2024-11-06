import { Attribute, HoldersGeneralized } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, SVGProps } from "react";
import { useMap } from "react-map-gl/maplibre";
import { SnowflakeMemoized } from "../Snowflake";

type Props = {
  placeId: string;
  placeName: string;
  placeAttributes: Attribute<HoldersGeneralized>[];
  radius: number;
  colorScale?: ScaleOrdinal<string, string, string>;
  rightOrder: string[];
  symbolScale?: ScaleOrdinal<string, string, string>;
} & SVGProps<SVGGElement>;

const RightsMarker: FC<Props> = ({
  placeId,
  placeName,
  placeAttributes,
  radius,
  colorScale,
  symbolScale,
  rightOrder,
}) => {
  const { current: map } = useMap();
  return map && map.getZoom() < 10 ? (
    <circle fill="white" stroke="black" strokeWidth={1} r="2" />
  ) : (
    <SnowflakeMemoized
      placeId={placeId}
      placeName={placeName}
      placeAttributes={placeAttributes}
      radius={radius}
      colorScale={colorScale}
      attributeOrder={rightOrder}
      symbolScale={symbolScale}
    />
  );
};

export default RightsMarker;
