import * as aq from "arquero";
import loadUniversityData from "./loadUniversityData";

const select = {
  place_name: "placeName",
  "geonames address": "geonamesAddress",
  latitudes: "geonamesLat",
  longitudes: "geonamesLng",
  "Google address": "googleAddress",
  lat: "googleLat",
  lng: "googleLng",
};

type Place = typeof select;

const loadPlaces = async () => {
  const events = await loadUniversityData();
  return aq.from(events).dedupe("place_name").select(select);
};

export default loadPlaces;
