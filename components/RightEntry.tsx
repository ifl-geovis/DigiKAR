import { Right } from "@/types/PlaceProperties";
import { RightOnPlace } from "@/types/RightOnPlace";
import { FC } from "react";
import { LuCalendar, LuUserRound } from "react-icons/lu";

type Props = {
  entry: RightOnPlace[Right][number];
};

const RightEntry: FC<Props> = ({ entry }) => {
  const { attested_raw, rightholders } = entry;
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
        <LuUserRound />
        <span className="text-xs font-bold">Inhaber</span>
      </div>
      <div className="grid flex-col gap-4">
        {rightholders.map((d, i) => {
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
              <div>Art des Inhabers</div>
              <div>{d.type}</div>
              <div>Kategorie</div>
              <div>
                <div className="flex items-center gap-1">
                  {d.category ?? (
                    <span className="text-muted-foreground">Andere</span>
                  )}
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
