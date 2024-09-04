"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";

type Biography = Awaited<
  ReturnType<typeof getBiographiesByCommonEvent>
>[number]["properties"];

export const columns: ColumnDef<Biography>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">
        <div
          // @ts-expect-error improve typing for modified query response
          style={{ backgroundColor: row.original.color }}
          className="mr-2 inline-block h-4 w-4 rounded-full align-text-bottom"
        />
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "events",
    header: "Ereignisse",
    cell: ({ row }) => {
      const amount = row.getValue<Biography["events"]>("events").length;
      return <div className="text-right font-medium">{amount}</div>;
    },
  },
];
