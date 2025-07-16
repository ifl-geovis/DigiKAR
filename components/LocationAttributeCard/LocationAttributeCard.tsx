import { getColorScale } from "@/lib/get-color-scale";
import { getRightHolderNames } from "@/lib/get-right-holder-names";
import getRightStatus from "@/lib/get-right-status";
import { rightSet } from "@/lib/right-set";
import { range, rollups } from "d3";
import { FC } from "react";
import { Attribute, RightWithPerspectives } from "../../types/PlaceProperties";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";

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
  const { colorScales, perspective, showIndividuals } =
    useRightsExplorerContext();
  const { isWithoutHolder } = getRightStatus(
    locationAttribute.holders,
    perspective,
  );
  const colorScale = getColorScale(colorScales, perspective, showIndividuals);
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
      <p className="text-muted-foreground font-mono text-sm">
        Herrschaftsrecht
      </p>
      {rightSet.get(locationAttribute.attributeName)?.label}
      <p className="text-muted-foreground mt-2 font-mono text-sm">Inhaber</p>
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
                      fill={
                        colorScale &&
                        colorScale(attribute ? attribute.normalize() : "")
                      }
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
