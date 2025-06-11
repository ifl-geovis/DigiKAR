import { FC } from "react";
import MapControl from "./MapControl";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import Spinner from "./Spinner";
import { RxCrossCircled } from "react-icons/rx";

const DataStateIndicator: FC = () => {
  const { rightsData } = useRightsExplorerContext();
  return rightsData?.error || rightsData?.isLoading ? (
    <MapControl>
      <div className="px-3">
        {rightsData?.isLoading && <Spinner />}
        {rightsData?.error && <RxCrossCircled />}
      </div>
    </MapControl>
  ) : null;
};

export default DataStateIndicator;
