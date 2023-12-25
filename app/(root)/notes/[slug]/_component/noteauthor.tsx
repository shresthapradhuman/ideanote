import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const NoteAuthor = ({
  createdAt,
  user,
}: {
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
}) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-14 w-14 xl:h-20 xl:w-20">
        <AvatarImage src={user?.image!} alt={user?.name!} />
        <AvatarFallback>N</AvatarFallback>
      </Avatar>
      <div>
        <h3>{user?.name}</h3>
        <span>{createdAt}</span>
      </div>
    </div>
  );
};

export default NoteAuthor;
