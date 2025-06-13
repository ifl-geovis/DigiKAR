import { FC } from "react";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import MapControl from "./MapControl";

const MapDebugger: FC = () => {
  const { perspective, isMultivariate } = useRightsExplorerContext();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <MapControl>
      <div className="p-2 font-mono text-xs">
        <p>
          {perspective} · {isMultivariate ? "multivariate" : "univariate"}
        </p>
      </div>
    </MapControl>
  );
};

export default MapDebugger;
