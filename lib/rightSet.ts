import { Right } from "@/types/PlaceProperties";

const rights = [
  {
    relation: "hochgericht",
    label: "Hochgericht",
  },
  {
    relation: "niedergericht",
    label: "Niedergericht (Anwesen)",
  },
  {
    relation: "grundherrschaft",
    label: "Grundherrschaft",
  },
  {
    relation: "landeshoheit",
    label: "Landeshoheit",
  },
  {
    relation: "verwaltungszugehoerigkeit",
    label: "Verwaltungszugehörigkeit",
  },
  {
    relation: "kirchenpatronat",
    label: "Kirchenpatronat",
  },
  {
    relation: "jagd",
    label: "Jagd",
  },
  {
    relation: "dorf_und_gemeindeherrschaft",
    label: "Dorf- und Gemeindeherrschaft",
  },
  {
    relation: "kollatur",
    label: "Kollatur",
  },
] satisfies { label: string; relation: Right }[];

export const rightSet = new Map(
  rights.map(({ relation, label }) => [relation, label]),
);
