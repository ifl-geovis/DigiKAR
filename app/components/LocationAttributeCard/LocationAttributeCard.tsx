import { Attribute } from "../../types/PlaceProperties";
import { FC } from "react";

type Props = {
  /**
   * How should the place be labelled?
   */
  placeName: string;
  /**
   * Which space-establishing attribute should be visualized? (uni or bivariate data with multiple expressions)
   */
  locationAttribute: Attribute;
  /**
   * Which color should the indicator be in?
   */
  color: string;
};

const LocationAttributeCard: FC<Props> = ({
  placeName,
  locationAttribute,
  color,
}) => {
  return (
    <>
      <h2 className="text-sm font-bold mb-2">{placeName}</h2>
      <p className="text-xs">Herrschaftsrecht</p>
      {locationAttribute.attributeName}
      <p className="text-xs">Inhaber:in</p>
      {locationAttribute.holders[0]?.holderConsolidated ?? <span>NA</span>}
      <svg
        className="inline ml-2"
        width={"1em"}
        height={"1em"}
        viewBox={"0 0 1 1"}
      >
        <circle transform="translate(0.5 0.5)" r={0.5} fill={color} />
      </svg>
    </>
  );
};

export default LocationAttributeCard;
