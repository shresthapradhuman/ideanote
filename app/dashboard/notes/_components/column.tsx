"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Note } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import {
  ArrowUpDown,
  MoreHorizontal,
  PencilLine,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export const Columns: ColumnDef<Note>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="grid gap-2 w-full">
          <h1 className=" truncate">{row.getValue("title")}</h1>
          <div className="flex md:hidden flex-wrap">
            <Badge
              variant={"outline"}
              className={`w-max text-[12px] ${
                row.original.noteStatus === "PUBLISHED"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {row.original.noteStatus === "PUBLISHED" ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "noteStatus",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="items-center hidden md:flex"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge
          variant={"outline"}
          className={`w-max text-[12px] hidden md:flex ${
            row.original.noteStatus === "PUBLISHED"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {row.getValue("noteStatus") === "PUBLISHED" ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="items-center hidden md:flex"
        >
          Last Update
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formatted = date.toLocaleDateString();
      return <div className="hidden md:block">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const onClick = async () => {
        try {
          await axios.delete(`/api/notes/${row.original.slug}`);
          location.reload();
          toast.success("Deleted successful");
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/notes/edit/${row.original.slug}`}
                className="flex items-center"
              >
                <PencilLine className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className="w-full" onClick={onClick}>
                <Trash2Icon className="w-4 h-4 mr-2" />
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
