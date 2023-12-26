"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useSWR from "swr";
import CommentList from "./comment-list";
import { Comment, User } from "@prisma/client";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

const commentSchema = z.object({
  desc: z.string().min(1, "Please enter a comment"),
});

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

type CommentProps = Comment & {
  user: User | null;
};

const CommentForm = ({ noteId }: { noteId: string }) => {
  const session = useSession();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      desc: "",
    },
  });
  const { data, mutate, isLoading } = useSWR<CommentProps[]>(
    `http://localhost:3000/api/notes/comments?noteId=${noteId}`,
    fetcher
  );
  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      const res = await axios.post("/api/notes/comments", {
        ...data,
        noteId,
      });
      if (res.status === 201) {
        form.reset();
      }
      mutate();
    } catch (error: Error | any) {
      error?.response.data
        ? toast.error(error?.response.data.message)
        : toast.error(error.message);
    }
  };
console.log(data);
  return (
    <div id="comment mb-4">
      <h1 className=" text-2xl font-bold mb-2">Comments</h1>
      {session.status === "authenticated" ? (
        <>
          <Form {...form}>
            <form
              className="gap-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className=" resize-none"
                        {...field}
                        placeholder="Write Your Comments."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex mt-4 justify-end items-end">
                <Button>
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <div className="mb-5 font-bold">
          Please login to write your comment....
        </div>
      )}
      <Separator className="my-10" />
      <div className="space-y-12">
        {isLoading ? (
          <div>Loading....</div>
        ) : data?.length === 0 ? (
          <div>No Comments Found</div>
        ) : (
          data?.map((item) => (
            <CommentList
              name={item.user?.name!}
              image={item.user?.image!}
              comment={item.desc!}
              email={item.user?.email!}
              key={item.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentForm;
