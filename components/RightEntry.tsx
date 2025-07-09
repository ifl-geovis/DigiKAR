import { Right } from "@/types/PlaceProperties";
import { RightViewPlaceJoin } from "@/types/RightView";
import { FC } from "react";
import { LuCalendar, LuUserRound } from "react-icons/lu";

type Props = {
  entry: RightViewPlaceJoin[Right][number];
};

const RightEntry: FC<Props> = ({ entry }) => {
  const { attested_raw, rightholders, particularities } = entry;
  console.log({ particularities });
  return (
    <div className="space-y-2 overflow-y-scroll">
      <div>
        <div className="flex items-center gap-2">
          <LuCalendar />
          <span className="font-mono text-xs font-bold">Quellendatum</span>
          {attested_raw}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LuUserRound />
        <span className="font-mono text-xs font-bold">Inhaber</span>
      </div>
      <div className="grid flex-col gap-4">
        {rightholders.map((d, i) => {
          return (
            <div
              className="grid grid-cols-[1fr_2fr] items-baseline gap-x-2 pl-6 [&>div:nth-child(odd)]:font-mono [&>div:nth-child(odd)]:text-xs"
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
      {particularities.at(0) != null && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <LuCalendar />
            <span className="font-mono text-xs font-bold">Besonderheiten</span>
          </div>
          <div className="space-y-2 pl-6">
            {particularities.map((d, i) => (
              <p key={i} className="border-l-2 border-slate-300 pl-2 text-sm">
                {d}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RightEntry;
