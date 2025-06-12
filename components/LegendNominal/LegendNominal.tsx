"use client";

import { twJoin } from "tailwind-merge";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import DisputedIcon from "/public/icons/disputed.svg";
import SharedIcon from "/public/icons/shared.svg";
import UnclearIcon from "/public/icons/unclear.svg";
import { reduceToUniqueHolders } from "@/lib/reduce-to-unique-holders";

const LegendNominal = () => {
  const {
    colorScales,
    perspective,
    setSelectedLegendItems,
    selectedLegendItems,
    rightsData,
    showIndividuals,
    onlyShowInView,
  } = useRightsExplorerContext();
  const uniqueHoldersInView = reduceToUniqueHolders(
    rightsData?.data,
    perspective,
    showIndividuals,
  );
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
      {colorScale
        .domain()
        .filter((d) =>
          onlyShowInView ? uniqueHoldersInView.includes(d.normalize()) : true,
        )
        .map((d) => {
          const isInView = uniqueHoldersInView.includes(d.normalize());
          const isSelectedItem = selectedItems.includes(d);
          return (
            <li
              key={d}
              className={twJoin(
                "flex cursor-pointer items-center gap-1 leading-tight transition-opacity duration-750",
                selectedLegendItems.length > 0 &&
                  !isSelectedItem &&
                  "opacity-30",
              )}
              onClick={() => handleLegendClick(d.normalize())}
            >
              <svg width={16} height={16} className="shrink-0">
                <circle
                  cx={8}
                  cy={8}
                  r={6.6}
                  stroke="black"
                  fill={colorScale(d)}
                />
                {!isInView && (
                  <circle cx={8} cy={8} r={3} stroke="none" fill="white" />
                )}
              </svg>
              <div>{d}</div>
            </li>
          );
        })}
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
              x={1}
              y={1}
              className={twJoin(background === "black" && "text-white")}
            />
          </svg>
          <div>{label}</div>
        </li>
      ))}
    </ol>
  );
};

export default LegendNominal;
