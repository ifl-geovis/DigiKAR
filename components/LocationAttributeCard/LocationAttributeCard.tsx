import { Attribute, HoldersGeneralized } from "../../types/PlaceProperties";
import { FC } from "react";

type Props = {
  /**
   * How should the place be labelled?
   */
  placeName: string;
  /**
   * Which space-establishing attribute should be visualized? (uni or bivariate data with multiple expressions)
   */
  locationAttribute: Attribute<HoldersGeneralized>;
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
  const displayName = locationAttribute.holders.isShared
    ? "geteilt"
    : locationAttribute.holders.categories?.[0];
  return (
    <>
      <h2 className="mb-2 text-sm font-bold">{placeName}</h2>
      <p className="text-xs">Herrschaftsrecht</p>
      {locationAttribute.attributeName}
      <p className="text-xs">Inhaber:in</p>
      {displayName ?? <span className="italic text-gray-500">keine Daten</span>}
      <svg
        className="ml-2 inline"
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
