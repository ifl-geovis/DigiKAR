import { Attribute, RightWithPerspectives } from "@/types/PlaceProperties";
import { scaleOrdinal, ScaleOrdinal, schemeTableau10 } from "d3";
import { FC, SVGProps } from "react";
import RightIndicator from "../RightIndicator";
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
  const { isMultivariate, univariateRight } = useRightsExplorerContext();
  const univariateAttribute = placeAttributes.find(
    (d) => d.attributeName === univariateRight,
  );
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
    univariateAttribute && (
      <RightIndicator
        colorScale={
          colorScale ??
          scaleOrdinal<string, string, string>().range(schemeTableau10)
        }
        x={0}
        y={0}
        circleRadius={6}
        placeName={placeName}
        placeId={placeId}
        attribute={univariateAttribute}
      />
    )
  );
};

export default RightsMarker;
