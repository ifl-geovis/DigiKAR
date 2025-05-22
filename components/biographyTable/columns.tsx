"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { BiographyIndividuals } from "@/lib/flows-to-individuals";

export const columns: ColumnDef<BiographyIndividuals[number]>[] = [
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
    accessorKey: "personId",
    header: "Id",
    cell: ({ row }) => (
      <div className="font-mono">{row.getValue("personId")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">
        <div
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
      const amount = row.getValue<BiographyIndividuals>("events").length;
      return <div className="text-right">{amount}</div>;
    },
  },
];
