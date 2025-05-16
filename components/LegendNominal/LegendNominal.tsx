"use client";

import { twJoin } from "tailwind-merge";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import DisputedIcon from "/public/icons/disputed.svg";
import SharedIcon from "/public/icons/shared.svg";
import UnclearIcon from "/public/icons/unclear.svg";

const LegendNominal = () => {
  const {
    colorScales,
    perspective,
    setSelectedLegendItems,
    selectedLegendItems,
  } = useRightsExplorerContext();
  const colorScale = colorScales.get(perspective)!;
  const specialCategories = [
    { label: "geteilt", Icon: SharedIcon },
    { label: "strittig", Icon: DisputedIcon },
    { label: "unklar", Icon: UnclearIcon, background: "lightgrey" },
  ];
  const selectedItems = selectedLegendItems ?? [];
  const handleLegendClick = (item: string) => {
    setSelectedLegendItems((prevState) => {
      if (prevState.includes(item)) {
        return prevState.filter((i) => i !== item);
      } else {
        return [...prevState, item];
      }
    });
  };
  return (
    <ol className="flex flex-col gap-2">
      {colorScale.domain().map((d) => (
        <li
          key={d}
          className={twJoin(
            "flex cursor-pointer items-center gap-1 leading-tight transition-opacity duration-750",
            selectedItems.length > 0 &&
              !selectedItems.includes(d) &&
              "opacity-30",
          )}
          onClick={() => handleLegendClick(d)}
        >
          <svg width={16} height={16} className="shrink-0">
            <circle cx={8} cy={8} r={6.6} stroke="black" fill={colorScale(d)} />
          </svg>
          <div>{d}</div>
        </li>
      ))}
      {specialCategories.map(({ label, Icon, background }) => (
        <li
          className={twJoin(
            "flex cursor-pointer items-center gap-1 leading-tight transition-opacity duration-750",
            selectedItems.length > 0 &&
              !selectedItems.includes(label) &&
              "opacity-30",
          )}
          key={label}
          onClick={() => handleLegendClick(label)}
        >
          <svg width={16} height={16} className="shrink-0">
            <circle
              cx={8}
              cy={8}
              r={6.6}
              stroke="black"
              fill={background ?? "white"}
            />
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
    </ol>
  );
};

export default LegendNominal;
