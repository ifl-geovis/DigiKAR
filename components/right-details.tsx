"use client";

import fetcher from "@/lib/fetcher";
import { localeDe } from "@/lib/format";
import {
  getAllButClosestEntry,
  getClosestEntry,
} from "@/lib/get-closest-entry";
import { rightSet } from "@/lib/right-set";
import { Right } from "@/types/PlaceProperties";
import { PostgRESTError } from "@/types/postgrest-error";
import { RightDefaultView } from "@/types/RightDefaultView";
import { LuKey, LuMapPin } from "react-icons/lu";
import useSWRImmutable from "swr/immutable";
import RightEntry from "./RightEntry";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";

const RightDetails = () => {
  const { detailInfo, setDetailInfo, timeRange } = useRightsExplorerContext();
  const { data, isLoading } = useSWRImmutable<
    Awaited<RightDefaultView[] | PostgRESTError>
  >(
    `https://api.geohistoricaldata.org/digikar/orte?select=*,${detailInfo?.attribute}(*)&id=eq.${detailInfo?.place}&limit=1`,
    fetcher,
  );

  if (!data || !detailInfo) return null; // TODO: display toast for some feedback?
  if (!Array.isArray(data))
    return (
      <Dialog open={!!detailInfo} onOpenChange={() => setDetailInfo(undefined)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fehler bei der Datenabfrage</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Beim Laden der Daten von der API ist ein Fehler aufgetreten.
          </DialogDescription>
          <div>
            Error Code
            <code className="ml-3 w-min rounded bg-red-300 p-1 text-red-700">
              {data.code}
            </code>
          </div>
          <code>{data.details}</code>
          <div className="rounded bg-gray-100 p-3 text-gray-500">
            <strong>Hint</strong>
            <p>{data.hint}</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  const place = data[0];
  const attribute = detailInfo.attribute as Right;
  const entries = place[attribute];

  const fixedEntries = entries.map((d) => ({
    ...d,
    attested: d.attested_json,
  }));

  //@ts-expect-error TODO: fix typing wrong typing: RightEntry vs. RightDefaultView
  const closest = getClosestEntry(timeRange, fixedEntries);
  //@ts-expect-error TODO: fix typing wrong typing: RightEntry vs. RightDefaultView
  const otherEntries = getAllButClosestEntry(timeRange, fixedEntries);

  return (
    <Dialog open={!!detailInfo} onOpenChange={() => setDetailInfo(undefined)}>
      <DialogContent className="max-w-2xl">
        {isLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : place && detailInfo ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {rightSet.get(attribute)?.label} in {place.label}
              </DialogTitle>
              <DialogDescription>Detailinformation</DialogDescription>
            </DialogHeader>
            <div className="max-h-[40vh] overflow-y-scroll">
              {/* @ts-expect-error wrong typing: RightEntry vs. RightDefaultView */}
              <RightEntry entry={closest} />
              {otherEntries.length > 0 && (
                <div className="mt-5 space-y-10 rounded-sm bg-gray-50 p-4">
                  <div>
                    <h3 className="mb-0 text-sm">
                      {otherEntries.length === 1
                        ? "Ein weiterer Eintrag"
                        : `${otherEntries.length} weitere Einträge`}
                    </h3>
                    <div className="text-muted-foreground text-sm">
                      chronologisch geordnet
                    </div>
                  </div>
                  {otherEntries?.map((entry, i) => {
                    // @ts-expect-error wrong typing: RightEntry vs. RightDefaultViews
                    return <RightEntry key={i} entry={entry} />;
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-3">
              <div className="text-muted-foreground rounded-sm border-t border-gray-100 pt-2 text-xs">
                <h3 className="text-xs">Details zum Ort</h3>
                <div className="font-bold">{place.label}</div>
                <div className="flex items-center gap-2">
                  <LuMapPin />
                  <pre>
                    {place.geometry.coordinates
                      .map((d) => localeDe.format(".5")(d))
                      .join(" ")}
                  </pre>
                </div>
                <div className="flex items-center gap-2">
                  <LuKey />
                  <pre>{place.id}</pre>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Fehler beim Lesen der Daten</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RightDetails;
