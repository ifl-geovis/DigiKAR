import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";
import { RightSummary } from "@/types/GeneralizedEndpoint";

export const getClosestEntry = (
  timeRange: TimeRange,
  entries: RightSummary,
) => {
  return getSortedCandidates(timeRange, entries)?.[0];
};

export const getAllButClosestEntry = (
  timeRange: TimeRange,
  entries: ReturnType<typeof addIds>,
) => {
  const closest = getClosestEntry(timeRange, entries);
  const withIds = addIds(entries);
  return withIds.filter(({ id }) => id !== closest?.id);
};

const addIds = (entries: RightSummary) => {
  return entries.map((d, i) => ({ ...d, id: i }));
};

const getSortedCandidates = (timeRange: TimeRange, entries: RightSummary) => {
  const { min, t, max } = timeRange;
  const candidates = addIds(entries).filter((entry) => {
    const lowerSupport = entry.attested[0].support[0] ?? -Infinity;
    const upperSupport = entry.attested[0].support[1] ?? Infinity;
    return Math.max(lowerSupport, min) < Math.min(upperSupport, max);
  }, []);
  if (candidates.length > 0) {
    const sorted = candidates
      .toSorted((a, b) => {
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
      })
      .map((d, i) => ({ ...d, closest: i === 0 }));
    return sorted;
  }
};
