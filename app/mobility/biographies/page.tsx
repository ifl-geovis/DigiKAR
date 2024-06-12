import Biographies from "@/components/Biographies";
import { getMapStyle } from "@/lib/getMapStyle";

export default async function NextPage() {
  const style = await getMapStyle();

  return (
    <>
      <h2 className="flex items-center gap-3">
        Biographien basierend auf gemeinsamen Ereignissen
      </h2>
      <Biographies style={style} />
    </>
  );
}
