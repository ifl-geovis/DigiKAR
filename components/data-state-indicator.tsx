import { FC } from "react";
import MapControl from "./MapControl";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import Spinner from "./Spinner";
import { RxCrossCircled } from "react-icons/rx";

const DataStateIndicator: FC = () => {
  const { dataState } = useRightsExplorerContext();
  return dataState?.error || dataState?.isLoading ? (
    <MapControl>
      <div className="px-3">
        {dataState.isLoading && <Spinner />}
        {dataState.error && <RxCrossCircled />}
      </div>
    </MapControl>
  ) : null;
};

export default DataStateIndicator;
