import { RightWithPerspectives } from "@/types/PlaceProperties";
import { Perspective } from "@/components/RightsExplorer/RightsExplorerContext";
import { getRightHolderNames } from "./get-right-holder-names";

const getRightStatus = (
  right: RightWithPerspectives,
  perspective: Perspective,
) => {
  const isWithoutHolder = right[perspective].length === 0;
  const isShared = new Set(getRightHolderNames(right[perspective])).size > 1;
  const isDisputed = right.disputedBy > 0;
  const isUnclear = right.categories?.[0] === "unklar";
  return {
    isWithoutHolder,
    isShared,
    isDisputed,
    isUnclear,
  };
};

export default getRightStatus;
