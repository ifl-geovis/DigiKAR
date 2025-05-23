import { formatLocale } from "d3";

export const localeDe = formatLocale({
  decimal: ",",
  grouping: [3],
  thousands: ".",
  currency: ["€", ""],
});

export function formatDateTimeDE(dateString: string): string {
  const date = new Date(dateString);
  // Show date and time in German format, with 2-digit day/month/year and hour/minute
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
