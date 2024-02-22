import { Attribute } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, SVGProps, memo } from "react";
import { useMap } from "react-map-gl/maplibre";
import Snowflake from "../Snowflake";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";

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
  attributeOrder, //TODO: replacing by context order is not working yet, order seems to be completely off
  symbolScale,
}) => {
  const { current: map } = useMap();
  const { order } = useRightsExplorerContext();
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
      attributeOrder={order}
      symbolScale={symbolScale}
    />
  );
};

export default RightsMarker;
