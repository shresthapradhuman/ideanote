"use client";
import { createNotesSchema } from "@/app/schemaValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import Editor from "./editor";

type NoteForm = z.infer<typeof createNotesSchema>;
const NoteForm = ({ initialData }: { initialData?: Note }) => {
  const router = useRouter();
  const form = useForm<NoteForm>({
    resolver: zodResolver(createNotesSchema),
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      noteStatus: initialData?.noteStatus || "DRAFT",
      image: "",
    },
  });
  const onSubmit = async (values: NoteForm) => {
    try {
      initialData
        ? await axios.patch("/api/notes/" + initialData.slug, values)
        : await axios.post("/api/notes", values);
      toast.success(
        initialData ? "Updated successfully" : "Created successfully"
      );
      router.push("/dashboard/notes");
      router.refresh();
    } catch (error: any) {
      error.response.data
        ? toast.error(error.response.data)
        : console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* title */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-inherit">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mastering Next.js: A Comprehensive Guide for React Developers"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* description */}
        <FormField
          name="excerpt"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-inherit">Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Embark on a journey of mastery with 'Mastering Next.js: A Comprehensive Guide for React Developers.' "
                  {...field}
                  className="truncate"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* note status */}
        <FormField
          name="noteStatus"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-inherit">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* content */}
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-inherit">Note Content</FormLabel>
              <FormControl>
                <Editor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-inherit">Upload Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      let reader = new FileReader();
                      reader.onload = (e) => {
                        field.onChange(e.target?.result);
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-4">
          <Button type="submit">
            {form.formState.isSubmitting
              ? "Creating..."
              : initialData
              ? "Update Note"
              : "Create Note"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NoteForm;
