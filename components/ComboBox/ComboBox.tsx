"use client";

import { LuCheck, LuChevronsUpDown } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FC, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  options: { value: string; label: string }[];
  optionLabel: string;
  onSelectHandler: (value: string) => void;
  defaultValue?: string;
};

const ComboBox: FC<Props> = ({
  options,
  optionLabel,
  onSelectHandler,
  defaultValue,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue?.toLowerCase());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((option) => option.value.toLowerCase() === value)
                ?.label
            : `${optionLabel} wählen ...`}
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] overflow-y-scroll p-0">
        <Command>
          <CommandInput placeholder={`${optionLabel} suchen ...`} />
          <CommandEmpty>No {optionLabel} found.</CommandEmpty>
          <ScrollArea className="max-h-[300px]">
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    onSelectHandler(newValue);
                    setOpen(false);
                  }}
                >
                  <LuCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
