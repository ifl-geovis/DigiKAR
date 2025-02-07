import EventsPerPlaceMap from "@/components/EventsPerPlaceMap";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function Wp3() {
  const style = await getMapStyle();

  return <EventsPerPlaceMap mapStyle={style} />;
}
