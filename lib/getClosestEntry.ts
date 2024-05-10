import { RightSummary } from "@/types/GeneralizedEndpoint";

export const getClosestEntry = (year: number, entries: RightSummary) => {
  const candidates = entries.map((entry) => {
    const distance = Math.min(
      ...entry.attested[0].support.map((d) => Math.abs((d ?? Infinity) - year)),
    );
    return { distance, entry };
  });
  if (candidates.length > 0)
    return candidates.sort(
      (a, b) => Math.abs(a.distance) - Math.abs(b.distance),
    )[0].entry;
};
