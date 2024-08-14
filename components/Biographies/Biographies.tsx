"use client";

import fetcher from "@/lib/fetcher";
import { StyleSpecification } from "maplibre-gl";
import { FC, useState } from "react";
import useSWRImmutable from "swr/immutable";
import BiographiesMap from "../BiographiesMap";
import MapStage from "../MapStage";
import PlaceSelector from "../PlaceSelector";
import { Skeleton } from "../ui/skeleton";

type Props = {
  style: StyleSpecification;
};

const Biographies: FC<Props> = ({ style }) => {
  const [place, setPlace] = useState<string>("Heilbad Heiligenstadt");
  const { data: biographyData, isLoading: biographyIsLoading } =
    useSWRImmutable(`/api/biographies?place=${place}`, fetcher);
  return (
    <div>
      <PlaceSelector place={place} onSelectHandler={setPlace} />
      <MapStage>
        {biographyIsLoading && <Skeleton className="h-full w-full" />}
        {biographyData && <BiographiesMap style={style} data={biographyData} />}
      </MapStage>
    </div>
  );
};

export default Biographies;
