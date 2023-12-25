import React, { FC } from "react";
import prisma from "@/prisma/client";
import { Separator } from "@/components/ui/separator";
import BackToHome from "./_component/backtohome";
import NoteTitle from "./_component/notetitle";
import NoteAuthor from "./_component/noteauthor";
import NoteThumbnail from "./_component/note-thumbnail";
import MarkdownContent from "./_component/markdown";
import CommentForm from "./_component/comment-form";

interface NotePageProps {
  params: {
    slug: string;
  };
}

const getNote = async (slug: string) => {
  return await prisma.note.findUnique({
    where: {
      slug,
    },
    include: {
      user: true,
    },
  });
};

const NotePage: FC<NotePageProps> = async ({ params }) => {
  const note = await getNote(params.slug);
  const formatedDate = note?.createdAt?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <>
      <BackToHome />
      <div className="flex w-full flex-col gap-10">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <NoteTitle title={note?.title!} />
            <NoteAuthor
              user={{
                name: note?.user?.name!,
                image: note?.user?.image!,
              }}
              createdAt={formatedDate!}
            />
          </div>
          <NoteThumbnail url={note?.url!} />
        </div>
        <Separator />
        <div className="prose dark:prose-invert max-w-5xl">
          <MarkdownContent content={note?.content!} />
        </div>
        <Separator />
        <CommentForm noteId={note?.id!} />
      </div>
    </>
  );
};

export default NotePage;
