import { Right } from "@/types/PlaceProperties";

export const rights = [
  {
    relation: "hochgericht_gemeinde",
    label: "Hochgericht – Gemeinde (Anwesen)",
    shortcode: "Hg-A",
  },
  {
    relation: "hochgericht_gemeindeflur",
    label: "Hochgericht – Gemeindeflur",
    shortcode: "Hg-Gf",
  },
  {
    relation: "niedergericht",
    label: "Niedergericht",
    shortcode: "Ng",
  },
  {
    relation: "grundherrschaft",
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
