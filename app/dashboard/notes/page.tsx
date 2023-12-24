import React from "react";
import prisma from "../../../prisma/client";
import { Columns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import Breadcrumb from "@/components/breadcrumb";

const NotesPage = async () => {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="mt-4">
      <Breadcrumb items={[{ label: "Notes", href: "#" }]} />
      <DataTable columns={Columns} data={notes} />
    </div>
  );
};

export default NotesPage;
