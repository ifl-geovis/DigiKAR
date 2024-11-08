import { RightOnPlace } from "@/types/RightOnPlace";
import { Right } from "@/types/PlaceProperties";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";
import { FC } from "react";
import { LuCalendar, LuScrollText, LuUser2 } from "react-icons/lu";

type Props = {
  entry: RightOnPlace[Right][number];
};

const RightEntry: FC<Props> = ({ entry }) => {
  const { attested_raw, sources, rightholders } = entry;
  const { colorScale } = useRightsExplorerContext();
  return (
    <div className="space-y-2 overflow-y-scroll">
      <div>
        <div className="flex items-center gap-2">
          <LuCalendar className="self-baseline" />
          <span className="text-xs font-bold">Quellendatum</span>
          {attested_raw}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LuUser2 className="self-baseline" />
        <span className="text-xs font-bold">Inhaber</span>
      </div>
      <div className="grid flex-col gap-4">
        {rightholders
          .filter((d) => d.type === "Körperschaft")
          .map((d, i) => {
            return (
              <div
                className="grid grid-cols-[2fr_5fr] items-baseline gap-x-2 pl-6 [&>div:nth-child(odd)]:text-xs"
                key={i}
              >
                <div>Inhaber laut Quelle</div>
                <div>{d.rightholder}</div>
                <div>Inhaber normalisiert</div>
                <div>{d.rightholder_consolidated}</div>
                <div>Kategorie</div>
                <div>
                  <div className="flex items-center gap-1">
                    {d.category}
                    <svg width={16} height={16}>
                      <circle
                        cx={8}
                        cy={8}
                        r={6.6}
                        stroke="black"
                        fill={colorScale(d.category)}
                      />
                    </svg>
                  </div>
                </div>
                <div>übergeordnete Herrschaft</div>
                <div>-</div>
              </div>
            );
          })}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <LuScrollText className="self-baseline" />{" "}
          <span className="text-xs font-bold">Quellen</span>
        </div>
        <ol className="ml-7 list-[lower-roman] marker:text-xs marker:text-muted-foreground">
          {sources.map((d, i) => {
            const formatted = d.startsWith("https") ? (
              <a className="underline" target="_blank" href={d}>
                {d}
              </a>
            ) : (
              d
            );
            return <li key={i}>{formatted}</li>;
          })}
        </ol>
      </div>
    </div>
  );
};

export default RightEntry;
