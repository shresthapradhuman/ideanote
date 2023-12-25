import Link from "next/link";
import React from "react";
import prisma from "@/prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NoteThumbnail from "./[slug]/_component/note-thumbnail";

const NotesPage = async () => {
  const notes = await prisma.note.findMany({
    where: {
      noteStatus: "PUBLISHED",
    },
    include: {
      user: true,
    },
  });
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          The Note
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          See how game-changing companies are making the most of every
          engagement with Preline.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.slug}`}
            className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <NoteThumbnail url={note.url!} />
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white truncate">
                {note.title}
              </h3>
              <p className="mt-5 text-gray-600 dark:text-gray-400 truncate">
                {note.excerpt}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-x-3">
              <Avatar>
                <AvatarImage
                  src={note.user?.image!}
                  alt={note.user?.name!}
                  width={32}
                  height={32}
                />
                <AvatarFallback>{note.user?.name?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div>
                <h5 className="text-sm text-gray-800 dark:text-gray-200">
                  {note.user?.name!}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
