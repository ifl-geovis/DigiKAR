import {
  IndividualDatum,
  PerspectiveDatum,
  Perspectives,
} from "@/types/PlaceProperties";

const hasTypeAttribute = (
  attribute:
    | Perspectives["categories"]
    | Perspectives["individuals"]
    | Perspectives["topLevels"],
): attribute is IndividualDatum[] => {
  return attribute?.every(
    (d) => typeof d !== "string" && Object.hasOwn(d, "type"),
  );
};

export const getRightHolderNames = (holders: PerspectiveDatum[]) => {
  const names = hasTypeAttribute(holders)
    ? holders?.map((d) => d.name.normalize())
    : holders?.map((d) => (d as string).normalize());
  return names;
};
