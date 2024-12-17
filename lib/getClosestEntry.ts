import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";
import { RightSummary } from "@/types/GeneralizedEndpoint";

export const getClosestEntry = (
  timeRange: TimeRange,
  entries: RightSummary,
) => {
  const { min, t, max } = timeRange;
  const candidates = entries.filter((entry) => {
    const lowerSupport = entry.attested[0].support[0] ?? -Infinity;
    const upperSupport = entry.attested[0].support[1] ?? Infinity;
    return lowerSupport > min && upperSupport < max;
  }, []);
  if (candidates.length > 0) {
    const sorted = candidates.toSorted((a, b) => {
      const aIsPast = a.attested[0].support[1] < t;
      const bIsPast = b.attested[0].support[1] < t;

      if (aIsPast && bIsPast) {
        // Both are past events, sort by most recent first
        return b.attested[0].support[1] - a.attested[0].support[1];
      } else if (!aIsPast && !bIsPast) {
        // Both are future events, sort by nearest first
        return (
          (a.attested[0].support[0] ?? 0) - (b.attested[0].support[0] ?? 0)
        );
      } else {
        // One is past and one is future, past events come first
        return aIsPast ? -1 : 1;
      }
    });
    return sorted[0];
  }
};
