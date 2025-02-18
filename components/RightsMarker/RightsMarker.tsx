import { Attribute, RightWithPerspectives } from "@/types/PlaceProperties";
import { ScaleOrdinal } from "d3";
import { FC, SVGProps } from "react";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { SnowflakeMemoized } from "../Snowflake";

type Props = {
  placeId: string;
  placeName: string;
  placeAttributes: Attribute<RightWithPerspectives>[];
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
  const { isMultivariate } = useRightsExplorerContext();
  return isMultivariate ? (
    <SnowflakeMemoized
      placeId={placeId}
      placeName={placeName}
      placeAttributes={placeAttributes}
      radius={radius}
      colorScale={colorScale}
      attributeOrder={rightOrder}
      symbolScale={symbolScale}
    />
  ) : (
    <circle fill="white" stroke="black" strokeWidth={1} r="2" />
  );
};

export default RightsMarker;
