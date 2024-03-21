import Biographies from "@/components/Biographies";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2 className="flex items-center gap-3">
        Biographies based on common events
      </h2>
      <Biographies style={style} />
    </>
  );
}
