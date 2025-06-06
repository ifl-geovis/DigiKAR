"use client";

import { FC } from "react";
import DataStateIndicator from "./data-state-indicator";
import MapDebugger from "./map-debugger";
import ZoomIndicator from "./ZoomIndicator";
import LayersControl from "./LayersControl";
import NavigationControl from "./navigation-control";

const MapControls: FC = () => {
  return (
    <div className="text-mono flex gap-2 [&>*]:pointer-events-auto">
      <NavigationControl />
      <div className="flex flex-col gap-2">
        <LayersControl />
        <DataStateIndicator />
      </div>
      <MapDebugger />
      <ZoomIndicator />
    </div>
  );
};

export default MapControls;
