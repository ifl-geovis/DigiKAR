import ComboBox from "@/components/ComboBox";
import { Skeleton } from "@/components/ui/skeleton";
import fetcher from "@/lib/fetcher";
import { getUniquePlaces } from "@/lib/getUniquePlaces";
import { FC, useMemo } from "react";
import useSWRImmutable from "swr/immutable";

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
    <div className="my-10 mt-5 flex h-10 items-center gap-3">
      {placeIsLoading && <Skeleton className="h-full w-full" />}
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
