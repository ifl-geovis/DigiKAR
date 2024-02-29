import { Attribute } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, SVGProps, memo } from "react";
import { useMap } from "react-map-gl/maplibre";
import Snowflake from "../Snowflake";

type Props = {
  placeName: string;
  placeAttributes: Attribute[];
  radius: number;
  colorScale?: ScaleOrdinal<string, string, string>;
  rightOrder: string[];
  symbolScale?: ScaleOrdinal<string, string, string>;
} & SVGProps<SVGGElement>;

const SnowflakeMemoized = memo(Snowflake);

const RightsMarker: FC<Props> = ({
  placeName,
  placeAttributes,
  radius,
  colorScale,
  symbolScale,
  rightOrder,
}) => {
  const { current: map } = useMap();
  return map && map.getZoom() < 10 ? (
    <circle fill="red" r="3" />
  ) : (
    <SnowflakeMemoized
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
