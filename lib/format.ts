import { formatLocale } from "d3";

export const localeDe = formatLocale({
  decimal: ",",
  grouping: [3],
  thousands: ".",
  currency: ["€", ""],
});
