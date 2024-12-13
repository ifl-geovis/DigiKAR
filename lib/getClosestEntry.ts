import { TimeRange } from "@/components/RightsExplorer/RightsExplorerContext";
import { RightSummary } from "@/types/GeneralizedEndpoint";

export const getClosestEntry = (
  timeRange: TimeRange,
  entries: RightSummary,
) => {
  const candidates = entries.reduce<
    { distance: number; entry: RightSummary[number] }[]
  >((acc, entry) => {
    const distance = Math.min(
      ...entry.attested[0].support.map((d) =>
        Math.abs((d ?? Infinity) - timeRange.t),
      ),
    );
    if (distance >= timeRange.min && distance <= timeRange.max)
      acc.push({ distance, entry });
    return acc;
  }, []);
  if (candidates.length > 0)
    return candidates.sort(
      (a, b) => Math.abs(a.distance) - Math.abs(b.distance),
    )?.[0].entry;
};
