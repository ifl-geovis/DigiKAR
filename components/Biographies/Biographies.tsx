"use client";

import { StyleSpecification } from "maplibre-gl";
import { FC, useState } from "react";
import MapStage from "../MapStage";
import BiographiesMap from "../BiographiesMap";
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/fetcher";
import { Skeleton } from "../ui/skeleton";
import ComboBox from "../ComboBox";
import { getUniquePlaces } from "@/lib/getUniquePlaces";

type Props = {
  style: StyleSpecification;
};

const Biographies: FC<Props> = ({ style }) => {
  const { data: placeData, isLoading: placeIsLoading } = useSWRImmutable<
    Awaited<ReturnType<typeof getUniquePlaces>>
  >(`/api/places`, fetcher);

  const [place, setPlace] = useState<string | undefined>(undefined);
  const { data: biographyData, isLoading: biographyIsLoading } =
    useSWRImmutable(`/api/biographies`, fetcher);
  return (
    <div>
      <div className="mt-5 my-10 h-10 flex gap-3 items-center">
        {placeIsLoading && <Skeleton className="h-full w-full" />}
        {placeData && (
          <ComboBox
            optionLabel="place"
            onSelectHandler={setPlace}
            options={placeData
              .filter((d) => d.place)
              .map(({ place }) => ({
                label: place,
                value: place,
              }))}
          />
        )}
        {place && (
          <span>
            selected Place: <strong>{place}</strong>
          </span>
        )}
      </div>
      <MapStage>
        {biographyIsLoading && <Skeleton className="h-full w-full" />}
        {biographyData && <BiographiesMap style={style} data={biographyData} />}
      </MapStage>
    </div>
  );
};

export default Biographies;
