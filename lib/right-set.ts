import { Right } from "@/types/PlaceProperties";

export const rights = [
  //TODO: split up into
  // - Hochgericht – Gemeinde (Anwesen)
  // - Hochgericht – Gemeindeflur
  {
    relation: "hochgericht",
    label: "Hochgericht",
    shortcode: "Hg",
  },
  {
    relation: "niedergericht",
    label: "Niedergericht",
    shortcode: "Ng",
  },
  {
    relation: "grundherrschaft_separated_rightholder_types",
    label: "Grundherrschaft",
    shortcode: "Gh",
  },
  {
    relation: "landeshoheit",
    label: "Landeshoheit",
    shortcode: "Lh",
  },
  {
    relation: "kirchenpatronat",
    label: "Kirchenpatronat",
    shortcode: "Kp",
  },
  {
    relation: "kirchenhoheit",
    label: "Kirchenhoheit",
    shortcode: "Kh",
  },
  {
    relation: "jagd",
    label: "Jagd",
    shortcode: "J",
  },
  {
    relation: "dorf_und_gemeindeherrschaft",
    label: "Dorf- und Gemeindeherrschaft",
    shortcode: "DGh",
  },
  {
    relation: "kollatur",
    label: "Kollatur",
    shortcode: "Ko",
  },
  {
    relation: "vogtei_ausser_etters",
    label: "Vogtei ausser Etters",
    shortcode: "VaE",
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
