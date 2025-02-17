import { FC } from "react";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import MapControl from "./MapControl";

const MapDebugger: FC = () => {
  const { perspective } = useRightsExplorerContext();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <MapControl>
      <div className="px-3">
        <p>{perspective} · symboltyp</p>
      </div>
    </MapControl>
  );
};

export default MapDebugger;
