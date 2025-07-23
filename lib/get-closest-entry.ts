import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";
import { RightEntry } from "@/types/RightView";

export const getClosestEntry = (
  timeRange: TimeRange,
  entries: RightEntry[],
) => {
  return getSortedCandidates(timeRange, entries)?.[0];
};

export const getAllButClosestEntry = (
  timeRange: TimeRange,
  entries: RightEntry[],
) => {
  const closest = getClosestEntry(timeRange, entries);
  const withIds = addIds(entries);
  return withIds.filter(({ id }) => id !== closest?.id);
};

const addIds = (entries: RightEntry[]) => {
  return entries.map((d, i) => ({ ...d, id: i }));
};

const getSortedCandidates = (timeRange: TimeRange, entries: RightEntry[]) => {
  const { min, t, max } = timeRange;
  const candidates = addIds(entries).filter((entry) => {
    const lowerSupport = entry.attested_json[0].support[0] ?? -Infinity;
    const upperSupport = entry.attested_json[0].support[1] ?? Infinity;
    return Math.max(lowerSupport, min) <= Math.min(upperSupport, max);
  }, []);
  if (candidates.length > 0) {
    const sorted = candidates
      .map((d) => {
        const tIsInSupport =
          t >= (d.attested_json[0].support[0] ?? -Infinity) &&
          t <= (d.attested_json[0].support[1] ?? Infinity);
        const distance = tIsInSupport
          ? 0
          : Math.min(
              Math.abs(t - (d.attested_json[0].support[0] ?? -Infinity)),
              Math.abs(t - (d.attested_json[0].support[1] ?? Infinity)),
            );
        return { ...d, distance };
      })
      .toSorted((a, b) => a.distance - b.distance);
    // Handle special case where multiple entries have the distance of 0
    const noDistanceCandidates = sorted.filter((d) => d.distance === 0);
    if (noDistanceCandidates.length > 1) {
      // Get minimum distance from both handles to t
      noDistanceCandidates
        .map((d) => {
          const lowerSupport = d.attested_json[0].support[0] ?? -Infinity;
          const upperSupport = d.attested_json[0].support[1] ?? Infinity;
          const minDistance = Math.min(
            Math.abs(t - lowerSupport),
            Math.abs(t - upperSupport),
          );
          return { ...d, minDistance };
        })
        .toSorted((a, b) => a.minDistance - b.minDistance);
      return noDistanceCandidates;
    }
    return sorted;
  }
};
