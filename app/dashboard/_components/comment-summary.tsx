import React from "react";
import prisma from "@/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CommentSummary = async () => {
  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
    take: 5,
  });
  return (
    <Card className="space-y-6 p-4">
      <h1 className="text-xl font-medium">Recent Comments</h1>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="flex items-center space-x-4 transition-all border border-transparent hover:border-inherit rounded-lg p-2"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={comment.user.image || "/image1.jpg"}
                alt={comment.user.name || ""}
              />
              <AvatarFallback>{comment.user.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex w-full items-start justify-between">
              <div>
                <p>{comment.desc.slice(0, 20)}</p>
                <span className="text-sm text-muted-foreground">
                  {comment.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"outline"}>Read</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Comment</DialogTitle>
                  <div>
                    <h1>{comment.desc}</h1>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default CommentSummary;
