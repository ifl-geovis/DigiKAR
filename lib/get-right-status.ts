import { RightWithPerspectives } from "@/types/PlaceProperties";

const getRightStatus = (right: RightWithPerspectives) => {
  const isWithoutHolder =
    right.heldBy === 0 ||
    // take into account that individuals can be empty due to rightholder type filter (Körperschaft, Person)
    right.individuals.length === 0;
  const isShared = right.heldBy > 1;
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
