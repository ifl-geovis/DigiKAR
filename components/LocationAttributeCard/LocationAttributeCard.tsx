import getRightStatus from "@/lib/getRightStatus";
import { Attribute, HoldersGeneralized } from "../../types/PlaceProperties";
import { FC } from "react";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";

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
};

const LocationAttributeCard: FC<Props> = ({ placeName, locationAttribute }) => {
  const { isWithoutHolder } = getRightStatus(locationAttribute.holders);
  const { colorScale } = useRightsExplorerContext();
  const categories = locationAttribute.holders.categories;
  return (
    <>
      <h2 className="mb-2 text-sm font-bold">{placeName}</h2>
      <p className="text-xs">Herrschaftsrecht</p>
      {locationAttribute.attributeName}
      <p className="text-xs">Inhaber:in</p>
      {isWithoutHolder ? (
        <span className="italic text-gray-500">keine Daten</span>
      ) : (
        <span>
          {categories?.map((d) => (
            <div key="d">
              <span>{d ?? "Andere Kateogrie"}</span>
              <svg
                className="ml-2 inline"
                width={"1em"}
                height={"1em"}
                viewBox={"0 0 1 1"}
              >
                <circle
                  transform="translate(0.5 0.5)"
                  r={0.5}
                  fill={colorScale(d ? d.normalize() : "")}
                />
              </svg>
            </div>
          ))}
        </span>
      )}
    </>
  );
};

export default LocationAttributeCard;
