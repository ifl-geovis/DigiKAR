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
import { localeDe } from "@/lib/format";
import { LuKey, LuMapPin } from "react-icons/lu";

const RightDetails = () => {
  const { detailInfo, setDetailInfo } = useRightsExplorerContext();
  const { data, isLoading } = useSWRImmutable<Awaited<RightOnPlace[]>>(
    `https://api.geohistoricaldata.org/digikar/orte?select=*,${detailInfo?.attribute.toLowerCase()}(*)&id=eq.${detailInfo?.place}`,
    fetcher,
  );

  const place = data?.[0];
  return (
    <Dialog open={!!detailInfo} onOpenChange={() => setDetailInfo(undefined)}>
      <DialogContent>
        {isLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : place && detailInfo ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {detailInfo?.attribute} in {place?.label}
              </DialogTitle>
              <DialogDescription>
                Detailinfos zum ausgewählten Ort und Recht.
              </DialogDescription>
            </DialogHeader>
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
