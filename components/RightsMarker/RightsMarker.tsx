import { Attribute } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, SVGProps, memo } from "react";
import { useMap } from "react-map-gl/maplibre";
import Snowflake from "../Snowflake";

type Props = {
  placeName: string;
  placeAttributes: Attribute[];
  radius: number;
  activeCategory?: string;
  colorScale?: ScaleOrdinal<string, string, string>;
  handleCategoryClick?: (category: string | undefined) => void;
  attributeOrder?: string[];
  symbolScale?: ScaleOrdinal<string, string, string>;
} & SVGProps<SVGGElement>;

const SnowflakeMemoized = memo(Snowflake);

const RightsMarker: FC<Props> = ({
  placeName,
  placeAttributes,
  radius,
  activeCategory,
  colorScale,
  handleCategoryClick,
  attributeOrder,
  symbolScale,
}) => {
  const { current: map } = useMap();
  return map && map.getZoom() < 10 ? (
    <circle fill="red" r="3" />
  ) : (
    <SnowflakeMemoized
      placeName={placeName}
      placeAttributes={placeAttributes}
      radius={radius}
      activeCategory={activeCategory}
      handleCategoryClick={handleCategoryClick}
      colorScale={colorScale}
      attributeOrder={attributeOrder}
      symbolScale={symbolScale}
    />
  );
};

export default RightsMarker;
