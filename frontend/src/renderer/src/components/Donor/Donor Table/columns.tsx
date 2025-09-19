"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@renderer/components/ui/button";
import { Donor } from "@renderer/types";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Donor>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birthDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Birth Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = String(row.getValue("birthDate"));
      const formatted = new Date(val).toLocaleDateString();
      return formatted;
    },
  },
  {
    accessorKey: "contactNo",
    header: "Contact No",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      if(row.getValue('address') === undefined) {
        return ''
      }
      const val = String(row.getValue("address"));
      let formatted = val.slice(0, 20) + "...";
      if(val.length < 20) formatted = val
      return formatted;
    },
  },
  {
    accessorKey: "identificationNo",
    header: "Identification No",
  },
];

export const filters = [
  {
    key: "name",
    name: "Name",
  },
  {
    key: "email",
    name: "Email",
  },
  {
    key: "contactNo",
    name: "Contact No",
  },
  {
    key: "address",
    name: "Address",
  },
  {
    key: "identificationNo",
    name: "Identification No",
  },
];
