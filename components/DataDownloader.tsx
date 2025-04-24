import { Button } from "@/components/ui/button";
import { Feature, FeatureCollection, LineString } from "geojson";
import { FC, useCallback } from "react";
import { LuCloudDownload } from "react-icons/lu";

type Props = {
  data: Feature<LineString>[];
};

const DataDownloader: FC<Props> = ({ data }) => {
  const downloadData = useCallback(() => {
    const fc: FeatureCollection<LineString> = {
      type: "FeatureCollection",
      features: data,
    };
    const json = JSON.stringify(fc);

    const blob = new Blob([json], { type: "application/json" });
    const jsonObjectUrl = URL.createObjectURL(blob);
    const date = new Date().toISOString();
    const filename = `${date}-digikar-export.geojson`;
    const anchorEl = document.createElement("a");
    anchorEl.href = jsonObjectUrl;
    anchorEl.download = filename;

    anchorEl.click();

    // Release reference to the file manually
    URL.revokeObjectURL(jsonObjectUrl);
  }, [data]);

  return (
    <Button className="flex gap-2" onClick={downloadData}>
      <LuCloudDownload />
      <span>Daten exportieren</span>
    </Button>
  );
};

export default DataDownloader;
