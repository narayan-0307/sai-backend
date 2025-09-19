"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@renderer/components/ui/button";
import { Donation } from "@renderer/types";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Donation>[] = [
  {
    accessorKey: "chequeNo",
    header: "CheNo",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "donorId.name",
    header: "Name",
  },
  {
    accessorKey: "AccountantSubmissionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ASD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = String(row.getValue("AccountantSubmissionDate"));
      const formatted = new Date(val).toLocaleDateString();
      return formatted;
    },
  },
  {
    accessorKey: "bank",
    header: "Bank",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "chequeDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Che D
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = String(row.getValue("chequeDate"));
      const formatted = new Date(val).toLocaleDateString();
      return formatted;
    },
  },
  {
    accessorKey: "clearanceDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ClearD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = String(row.getValue("clearanceDate"));
      const formatted = new Date(val).toLocaleDateString();
      return formatted;
    },
  },
  {
    accessorKey: "dateOfIssue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DOI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = String(row.getValue("dateOfIssue"));
      const formatted = new Date(val).toLocaleDateString();
      return formatted;
    },
  },
  {
    accessorKey: "depositBank",
    header: "DepBank",
  },
  {
    accessorKey: "depositDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DepD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = String(row.getValue("depositDate"));
      const formatted = new Date(val).toLocaleDateString();
      return formatted;
    },
  },
  {
    accessorKey: "submissionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:text-white font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SubD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const val = String(row.getValue("submissionDate"));
      const formatted = new Date(val).toLocaleDateString();
      return formatted;
    },
  },
  {
    accessorKey: "remark",
    header: "Remark",
  },
];

export const filters = [
  {
    key: "bank",
    name: "Bank",
  },
  {
    key: "branch",
    name: "branch",
  },
  {
    key: "chequeNo",
    name: "chequeNo",
  },
  {
    key: "depositBank",
    name: "depositBank",
  },
  {
    key: "remark",
    name: "remark",
  },
];
