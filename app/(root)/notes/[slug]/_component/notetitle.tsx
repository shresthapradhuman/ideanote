import React from "react";

const NoteTitle = ({ title }: { title: string }) => {
  return <h1 className="text-lg md:text-5xl md:leading-normal">{title}</h1>;
};

export default NoteTitle;
