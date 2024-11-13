import { Right } from "@/types/PlaceProperties";
import { RightOnPlace } from "@/types/RightOnPlace";
import { FC } from "react";
import { LuCalendar, LuUser2 } from "react-icons/lu";
import { useRightsExplorerContext } from "./RightsExplorer/RightsExplorerContext";

type Props = {
  entry: RightOnPlace[Right][number];
};

const RightEntry: FC<Props> = ({ entry }) => {
  const { attested_raw, rightholders } = entry;
  const { colorScale } = useRightsExplorerContext();
  return (
    <div className="space-y-2 overflow-y-scroll">
      <div>
        <div className="flex items-center gap-2">
          <LuCalendar />
          <span className="text-xs font-bold">Quellendatum</span>
          {attested_raw}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LuUser2 />
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
                <div>
                  {d.rightholder_consolidated ?? (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
                <div>Kategorie</div>
                <div>
                  <div className="flex items-center gap-1">
                    {d.category ?? (
                      <span className="text-muted-foreground">Andere</span>
                    )}
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
                <div>
                  {d.top_level ?? (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
                <div>Quelle</div>
                <div>
                  {d.source.startsWith("https") ? (
                    <a className="underline" target="_blank" href={d.source}>
                      {d.source}
                    </a>
                  ) : (
                    <>{d.source}</>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightEntry;
