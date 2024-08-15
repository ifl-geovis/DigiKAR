import ComboBox from "@/components/ComboBox";
import { Skeleton } from "@/components/ui/skeleton";
import fetcher from "@/lib/fetcher";
import { getUniquePlaces } from "@/lib/getUniquePlaces";
import { FC, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { Label } from "./ui/label";

type Props = {
  onSelectHandler: (value: string) => void;
  place: string;
};

const PlaceSelector: FC<Props> = ({ onSelectHandler, place }) => {
  const { data: placeData, isLoading: placeIsLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getUniquePlaces>>
  >(`/api/places`, fetcher, {});

  const options = useMemo(() => {
    return !placeData
      ? []
      : placeData
          .filter((d) => d.place)
          .map(({ place }) => ({
            label: place,
            value: place,
          }));
  }, [placeData]);
  return (
    <div className="my-10 flex items-center gap-3">
      <Label>Ort</Label>
      {placeIsLoading && <Skeleton className="h-10 w-[200px]" />}
      {placeData && (
        <ComboBox
          optionLabel="Ort"
          defaultValue={place}
          onSelectHandler={onSelectHandler}
          options={options}
        />
      )}
    </div>
  );
};

export default PlaceSelector;
