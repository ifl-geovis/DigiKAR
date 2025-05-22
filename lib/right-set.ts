import { Right } from "@/types/PlaceProperties";

export const rights = [
  {
    relation: "hochgericht",
    label: "Hochgericht",
    shortcode: "H",
  },
  {
    relation: "niedergericht",
    label: "Niedergericht (Anwesen)",
    shortcode: "N",
  },
  {
    relation: "grundherrschaft",
    label: "Grundherrschaft",
    shortcode: "G",
  },
  {
    relation: "landeshoheit",
    label: "Landeshoheit",
    shortcode: "L",
  },
  {
    relation: "kirchenpatronat",
    label: "Kirchenpatronat/Kirchenhoheit",
    shortcode: "Ki",
  },
  {
    relation: "jagd",
    label: "Jagd",
    shortcode: "J",
  },
  {
    relation: "dorf_und_gemeindeherrschaft",
    label: "Dorf- und Gemeindeherrschaft",
    shortcode: "D",
  },
  {
    relation: "kollatur",
    label: "Kollatur",
    shortcode: "Ko",
  },
] satisfies { label: string; shortcode: string; relation: Right }[];

// Sort rights by label
rights.sort((a, b) => a.label.localeCompare(b.label));

export const rightSet = new Map(
  rights.map(({ relation, label, shortcode }) => [
    relation,
    { label, shortcode },
  ]),
);
