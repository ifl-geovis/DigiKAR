import EventsPerPlaceMap from "@/components/EventsPerPlaceMap";
import { getMapStyle } from "@/lib/get-map-style";

export default async function Wp3() {
  const style = await getMapStyle("mobility");

  return <EventsPerPlaceMap mapStyle={style} />;
}
