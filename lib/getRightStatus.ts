import { HoldersGeneralized } from "@/types/PlaceProperties";

const getRightStatus = (right: HoldersGeneralized) => {
  const isWithoutHolder = right.heldBy === 0;
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
