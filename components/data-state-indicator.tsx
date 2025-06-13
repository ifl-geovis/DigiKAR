import { FC } from "react";
import MapControl from "./MapControl";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import Spinner from "./Spinner";
import { RxCrossCircled } from "react-icons/rx";
import { twJoin } from "tailwind-merge";

const DataStateIndicator: FC = () => {
  const { rightsData } = useRightsExplorerContext();
  return rightsData?.error || rightsData?.isLoading ? (
    <MapControl>
      <div className={twJoin("p-2", rightsData?.error && "bg-red-50")}>
        {rightsData?.isLoading && <Spinner />}
        {!rightsData?.isLoading && rightsData?.error && (
          <RxCrossCircled color="red" />
        )}
      </div>
    </MapControl>
  ) : null;
};

export default DataStateIndicator;
