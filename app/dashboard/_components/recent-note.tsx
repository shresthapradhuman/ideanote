import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";

const RecentNotes = async () => {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    where: {
      noteStatus: "PUBLISHED",
    },
  });
  return (
    <Card>
      <CardHeader className="space-y-8 py-7">
        <CardTitle>Recent Notes</CardTitle>
        <Separator />
      </CardHeader>
      {notes.map((note) => (
        <CardContent className="px-4" key={note.slug}>
          <Link
            href={`/dashboard/notes/edit/${note.slug}`}
            className=" flex flex-col rounded-md border border-transparent hover:border-inherit space-y-1 p-2"
          >
            <h1 className="font-medium">{note.title.slice(0, 50)}...</h1>
            <p className="font-light text-sm dark:text-gray-500 flex-1 truncate">
              {note.excerpt}
            </p>
          </Link>
        </CardContent>
      ))}
    </Card>
  );
};

export default RecentNotes;
