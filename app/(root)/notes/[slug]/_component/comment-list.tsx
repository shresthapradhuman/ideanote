import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const CommentList = ({
  image,
  name,
  email,
  comment,
}: {
  image: string;
  name: string;
  email: string;
  comment: string;
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={image || "/image1.jpg"} alt={name} />
          <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{name}</p>
          {/* <p className="text-sm text-muted-foreground">{email}</p> */}
        </div>
      </div>
      <div className="flex items-center">{comment}</div>
    </div>
  );
};

export default CommentList;
