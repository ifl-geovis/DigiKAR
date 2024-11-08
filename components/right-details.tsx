"use client";

import useSWRImmutable from "swr/immutable";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "./ui/skeleton";
import { RightOnPlace } from "@/types/RightOnPlace";
import { Right } from "@/types/PlaceProperties";
import { localeDe } from "@/lib/format";
import { LuKey, LuMapPin } from "react-icons/lu";
import RightEntry from "./RightEntry";
import { capitalize } from "@/lib/utils";

const RightDetails = () => {
  const { detailInfo, setDetailInfo } = useRightsExplorerContext();
  const { data, isLoading } = useSWRImmutable<Awaited<RightOnPlace[]>>(
    `https://api.geohistoricaldata.org/digikar/orte?select=*,${detailInfo?.attribute}(*)&id=eq.${detailInfo?.place}&limit=1`,
    fetcher,
  );

  if (!data || !detailInfo) return null;
  const place = data[0];
  const attribute = detailInfo.attribute as Right;
  const entries = place[attribute];

  return (
    <Dialog open={!!detailInfo} onOpenChange={() => setDetailInfo(undefined)}>
      <DialogContent className="max-w-2xl">
        {isLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : place && detailInfo ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {capitalize(detailInfo.attribute)} in {place.label}
              </DialogTitle>
              <DialogDescription>
                Detailinformation, chronologisch
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[40vh] space-y-10 overflow-y-scroll">
              {entries.map((entry, i) => {
                return <RightEntry key={i} entry={entry} />;
              })}
            </div>
            <div className="flex flex-col space-y-3">
              <div className="rounded-sm border-t border-gray-100 pt-2 text-xs text-muted-foreground">
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
