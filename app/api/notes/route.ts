import { createNotesSchema } from "@/app/schemaValidation";
import { createSlug } from "@/lib/utils";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "../auth/authOptions";
import { uploadImage } from "@/lib/upload";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { message: "Not Authenticated!" },
      { status: 401 }
    );
  }
  const body = await request.json();
  const validation = createNotesSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  /** upload image to cloudinary */
  let thumbnail = {
    public_id: "",
    url: "",
  };

  if (body.image) {
    thumbnail = await uploadImage(body.image);
  }

  const newNote = await prisma.note.create({
    data: {
      title: body.title,
      slug: createSlug(body.title),
      noteStatus: body.noteStatus ? body.noteStatus : "DRAFT",
      excerpt: body.excerpt,
      content: body.content,
      public_id: thumbnail.public_id,
      url: thumbnail.url,
      user: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });
  return NextResponse.json(newNote, { status: 201 });
}
