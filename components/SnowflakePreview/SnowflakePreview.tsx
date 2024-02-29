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
import { LuRotateCcw, LuRotateCw } from "react-icons/lu";
import { RxEyeNone } from "react-icons/rx";
import RightShape from "../RightShape";
import { useRightsExplorerContext } from "../RightsExplorer/RightsExplorerContext";
import useSnowflake from "../Snowflake/useSnowflake.hook";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const SnowflakePreview = () => {
  const { order, setOrder, symbolMap, setSymbolMap, uniqueSet } =
    useRightsExplorerContext();
  const placeAttributes = Array.from(uniqueSet).map((d) => ({
    attributeName: d,
    holders: [],
  }));

  const radius = 50;
  const circleRadius = 5;
  const padding = 3;
  const { points } = useSnowflake(placeAttributes, radius, circleRadius, order);

  return (
    <div className="rounded bg-gray-100 p-3">
      <svg width={(radius + padding) * 2} height={(radius + padding) * 2}>
        <g transform={`translate(${radius + padding} ${radius + padding})`}>
          {points.map(({ x, y, attributeName }) => {
            return (
              <Popover key={attributeName}>
                <PopoverTrigger asChild className="cursor-pointer">
                  <g className="group">
                    <line x2={x} y2={y} stroke="black" />
                    <RightShape
                      x={x}
                      y={y}
                      color={"white"}
                      symbol={symbolMap.get(attributeName)}
                      size={circleRadius}
                      opacity={1}
                      isShared={false}
                    />
                  </g>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-4">
                      <Label>Right</Label>
                      <span>{attributeName}</span>
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
                          <SelectItem value={"square"}>Square</SelectItem>
                          <SelectItem value={"circle"}>Circle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => {
                            const newOrder = move(order, attributeName, false);
                            setOrder([...newOrder]);
                          }}
                        >
                          <LuRotateCcw />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={() => {
                            const newOrder = move(order, attributeName);
                            setOrder([...newOrder]);
                          }}
                        >
                          <LuRotateCw />
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
