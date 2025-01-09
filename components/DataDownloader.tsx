import { LuCalendar, LuDownloadCloud, LuUser2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { FC, useCallback } from "react";
import { Feature, FeatureCollection, LineString } from "geojson";

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
    <>
      <table className="mb-3 [&_td]:pr-2">
        <tbody>
          <tr>
            <td className="text-right">{data.length}</td>
            <td>
              <LuUser2 className="mr-2 inline" />
            </td>
            <td>Biographien</td>
          </tr>
          <tr>
            <td>
              {" "}
              {data.reduce((acc, p) => (acc += p.properties?.events.length), 0)}
            </td>
            <td>
              <LuCalendar className="mr-2 inline" />
            </td>
            <td>Ereignisse</td>
          </tr>
        </tbody>
      </table>
      <Button className="flex gap-2" onClick={downloadData}>
        <LuDownloadCloud />
        <span>Daten exportieren</span>
      </Button>
    </>
  );
};

export default DataDownloader;
