import getRightStatus from "@/lib/get-right-status";
import { Attribute, RightWithPerspectives } from "../../types/PlaceProperties";
import { FC } from "react";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { range, rollups } from "d3";
import { getRightHolderNames } from "@/lib/get-right-holder-names";
import { rightSet } from "@/lib/right-set";

type Props = {
  /**
   * How should the place be labelled?
   */
  placeName: string;
  /**
   * Which space-establishing attribute should be visualized? (uni or bivariate data with multiple expressions)
   */
  locationAttribute: Attribute<RightWithPerspectives>;
  /**
   * Which color should the indicator be in?
   */
};

const LocationAttributeCard: FC<Props> = ({ placeName, locationAttribute }) => {
  const { isWithoutHolder } = getRightStatus(locationAttribute.holders);
  const { colorScales, perspective } = useRightsExplorerContext();
  const colorScale = colorScales.get(perspective)!;
  const attribute = locationAttribute.holders[perspective];
  const names = getRightHolderNames(attribute);
  const summarized =
    names?.length > 0
      ? rollups(
          names,
          (v) => v.length,
          (d) => d ?? "unbekannt",
        ).sort((a, b) => b[1] - a[1])
      : [];
  return (
    <div className="text-base">
      <h2 className="mb-2 text-base font-bold">{placeName}</h2>
      <p className="text-muted-foreground text-sm">Herrschaftsrecht</p>
      {rightSet.get(locationAttribute.attributeName)?.label}
      <p className="text-muted-foreground mt-2 text-sm">Inhaber</p>
      {isWithoutHolder ? (
        <span className="text-gray-500 italic">keine Daten</span>
      ) : (
        <span>
          {summarized.map(([attribute, number]) => (
            <div className="flex items-center space-x-2" key={attribute}>
              <span className="font-bold">{number}</span>
              <span>{attribute ?? "Andere Kateogrie"}</span>
              <div className="flex -space-x-2">
                {range(number).map((i) => (
                  <svg key={i} className="h-[15px] w-[15px]">
                    <circle
                      transform="translate(7.5 7.5)"
                      r={6.5}
                      stroke="black"
                      fill={colorScale(attribute ? attribute.normalize() : "")}
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </span>
      )}
    </div>
  );
};

export default LocationAttributeCard;
