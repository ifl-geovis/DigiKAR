"use client";

import { twJoin } from "tailwind-merge";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import { useMapStateContext } from "../MapState/MapStateContext";
import DisputedIcon from "/public/icons/disputed.svg";
import SharedIcon from "/public/icons/shared.svg";
import UnclearIcon from "/public/icons/unclear.svg";

const LegendNominal = () => {
  const { viewState } = useMapStateContext();
  const { colorScale, setActiveCategory, activeCategory } =
    useRightsExplorerContext();
  const specialCategories = [
    { label: "geteilt", Icon: SharedIcon, background: "black" },
    { label: "strittig", Icon: DisputedIcon, background: "black" },
    { label: "unklar", Icon: UnclearIcon, background: "lightgrey" },
  ];
  if (viewState.zoom < 10)
    return (
      <p className="italic text-muted-foreground">
        Die Legende ist nur in größeren Zoomstufen sichtbar.
      </p>
    );
  return (
    <>
      <ol className="flex flex-col gap-2">
        {specialCategories.map(({ label, Icon, background }) => (
          <li
            className={twJoin(
              twJoin(
                "flex cursor-pointer items-center gap-1 leading-tight transition-opacity",
                activeCategory === label && "font-bold",
                activeCategory && activeCategory !== label && "opacity-30",
              ),
            )}
            key={label}
            onClick={() =>
              setActiveCategory((prevState?: string) =>
                prevState !== label ? label : undefined,
              )
            }
          >
            <svg width={16} height={16} className="shrink-0">
              <circle cx={8} cy={8} r={6.6} stroke="black" fill={background} />
              <Icon
                className={twJoin(
                  "translate-x-[1px] translate-y-[1px]",
                  background === "black" && "text-white",
                )}
              />
            </svg>
            <div>{label}</div>
          </li>
        ))}
        {colorScale.domain().map((d) => (
          <li
            key={d}
            className={twJoin(
              "flex cursor-pointer items-center gap-1 leading-tight transition-opacity",
              activeCategory === d && "font-bold",
              activeCategory && activeCategory !== d && "opacity-30",
            )}
            onClick={() =>
              setActiveCategory((prevState?: string) =>
                prevState !== d ? d : undefined,
              )
            }
          >
            <svg width={16} height={16} className="shrink-0">
              <circle
                cx={8}
                cy={8}
                r={6.6}
                stroke="black"
                fill={colorScale(d)}
              />
            </svg>
            <div>{d}</div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default LegendNominal;
