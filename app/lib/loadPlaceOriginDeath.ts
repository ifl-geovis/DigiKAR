import * as aq from "arquero";
import { BioEvent } from "../types/BioEvent";
import loadUniversityData from "./loadUniversityData";
import loadPlaces from "./loadPlaces";

const loadPlaceOriginDeath = async () => {
  const events = await loadUniversityData();
  const places = await loadPlaces();
  return (
    aq
      .from(events)
      .filter((d: BioEvent) => aq.op.match(d.event_type, /(Tod|Geburt)$/, null))
      .groupby("place_name", "event_type")
      .count()
      .groupby("place_name")
      .pivot("event_type", "count")
      .rename({ place_name: "placeName" })
      .reify()
      // .lookup(places);
      .join_left(places, "placeName")
      .filter(
        (d: BioEvent & { geonamesAddress: string }) =>
          !aq.op.match(d.geonamesAddress, /^n\/a$/, null)
      )
  );
};

export default loadPlaceOriginDeath;
