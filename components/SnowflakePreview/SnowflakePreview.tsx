import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { move } from "@/lib/utils";
import { RxEyeNone } from "react-icons/rx";
import { TbRotateDot } from "react-icons/tb";
import RightShape from "../RightShape";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import useSnowflake from "../Snowflake/useSnowflake.hook";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const SnowflakePreview = () => {
  const { order, setOrder, symbolMap, setSymbolMap, rightSet, perspective } =
    useRightsExplorerContext();
  const placeAttributes = [...rightSet.keys()].map((relation) => ({
    attributeName: relation,
    holders: {
      categories: [""],
      individuals: [""],
      topLevels: [""],
      disputedBy: 0,
    },
  }));

  const radius = 30;
  const radiusLabels = radius + 20;
  const circleRadius = 6.6;
  const padding = 20;
  const { points } = useSnowflake(
    placeAttributes,
    radius,
    circleRadius,
    order,
    perspective,
  );
  const { points: pointsLabels } = useSnowflake(
    placeAttributes,
    radiusLabels,
    circleRadius,
    order,
    perspective,
  );

  return (
    <div className="self-start rounded bg-gray-100 p-1">
      <svg
        width={(radiusLabels + padding) * 2}
        height={(radiusLabels + padding) * 2}
      >
        <g
          transform={`translate(${radiusLabels + padding} ${radiusLabels + padding})`}
        >
          {points.map(({ x, y, attributeName }, i) => {
            return (
              <Popover key={attributeName}>
                <PopoverTrigger asChild className="cursor-pointer">
                  <g className="group">
                    <text
                      x={pointsLabels[i].x}
                      y={pointsLabels[i].y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-mono text-xs font-bold group-data-[state=open]:font-black"
                    >
                      {rightSet.get(attributeName)?.shortcode}
                    </text>
                    <line x2={x} y2={y} stroke="black" />
                    <RightShape
                      x={x}
                      y={y}
                      color={"white"}
                      symbol={symbolMap.get(attributeName)}
                      size={circleRadius}
                      opacity={1}
                      isShared={false}
                      isDisputed={false}
                      isUnclear={false}
                    />
                  </g>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-4">
                      <Label>Recht</Label>
                      <span>{rightSet.get(attributeName)?.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label>Symbol</Label>
                      <Select
                        defaultValue={symbolMap.get(attributeName) ?? "circle"}
                        onValueChange={(value) => {
                          setSymbolMap(
                            new Map(symbolMap.set(attributeName, value)),
                          );
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose a symbol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"square"}>Quadrat</SelectItem>
                          <SelectItem value={"circle"}>Kreis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => {
                            const newOrder = move(order, attributeName);
                            setOrder([...newOrder]);
                          }}
                        >
                          <TbRotateDot className="scale-x-[-1]" />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => {
                            const newOrder = move(order, attributeName, false);
                            setOrder([...newOrder]);
                          }}
                        >
                          <TbRotateDot />
                        </Button>
                        <Button
                          size={"icon"}
                          onClick={() =>
                            setOrder(order.filter((d) => d != attributeName))
                          }
                        >
                          <RxEyeNone />
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default SnowflakePreview;
