import dynamic from "next/dynamic";
import React from "react";
import prisma from "../../../../../prisma/client";
import NoteFormSkeleton from "../../_components/note-form-skeleton";
import Breadcrumb from "@/components/breadcrumb";

const NoteForm = dynamic(() => import("../../_components/note-form"), {
  ssr: false,
  loading: () => <NoteFormSkeleton />,
});

interface EditNotePorps {
  params: { slug: string };
}

const EditNotesPage = async ({ params }: EditNotePorps) => {
  const note = await prisma.note.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return (
    <div className="gap-4 grid pb-10">
      <div className="space-y-2">
        <Breadcrumb
          items={[
            { label: "Notes", href: "/dashboard/notes" },
            { label: "Edit", href: "#" },
          ]}
        />
      </div>
      <NoteForm initialData={note ? note : undefined} />
    </div>
  );
};

export default EditNotesPage;
