import dynamic from "next/dynamic";
import React from "react";
import NoteFormSkeleton from "../_components/note-form-skeleton";
import Breadcrumb from "@/components/breadcrumb";

const NoteForm = dynamic(() => import("../_components/note-form"), {
  ssr: false,
  loading: () => <NoteFormSkeleton />,
});

const NewNotesPage = () => {
  const items = [
    { label: "Notes", href: "/dashboard/notes" },
    { label: "New", href: "#" },
  ];
  return (
    <div className="space-y-3 ">
      <Breadcrumb items={items} />
      <NoteForm />
    </div>
  );
};

export default NewNotesPage;
