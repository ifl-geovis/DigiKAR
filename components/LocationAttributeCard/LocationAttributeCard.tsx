import getRightStatus from "@/lib/getRightStatus";
import { Attribute, HoldersGeneralized } from "../../types/PlaceProperties";
import { FC } from "react";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { range, rollups } from "d3";
import { capitalize } from "@/lib/utils";

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
  const summarized = categories
    ? rollups(
        categories,
        (v) => v.length,
        (d) => d ?? "unbekannt",
      ).sort((a, b) => b[1] - a[1])
    : [];
  return (
    <>
      <h2 className="mb-2 text-sm font-bold">{placeName}</h2>
      <p className="text-xs">Herrschaftsrecht</p>
      {capitalize(locationAttribute.attributeName)}
      <p className="text-xs">Inhaber</p>
      {isWithoutHolder ? (
        <span className="italic text-gray-500">keine Daten</span>
      ) : (
        <span>
          {summarized.map(([category, number]) => (
            <div className="flex items-center space-x-2" key={category}>
              <span className="font-bold">{number}</span>
              <span>{category ?? "Andere Kateogrie"}</span>
              <div className="flex -space-x-2">
                {range(number).map((i) => (
                  <svg key={i} className="h-[15px] w-[15px]">
                    <circle
                      transform="translate(7.5 7.5)"
                      r={6.5}
                      stroke="black"
                      fill={colorScale(category ? category.normalize() : "")}
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </span>
      )}
    </>
  );
};

export default LocationAttributeCard;
