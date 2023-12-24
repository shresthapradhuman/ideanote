import * as z from "zod";

export const createNotesSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(150, "Title must be less than 150 characters"),
  excerpt: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description must be less than 255 characters"),
  content: z.string().min(1, "Content is required"),
  noteStatus: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  image: z.string(),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is a required").max(255),
  email: z.string().email("Invalid email address"),
  image: z.string(),
});
