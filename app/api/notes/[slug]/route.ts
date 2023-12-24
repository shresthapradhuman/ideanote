import { createNotesSchema } from "@/app/schemaValidation";
import { createSlug } from "@/lib/utils";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "../../auth/authOptions";
import { deleteImage, uploadImage } from "@/lib/upload";

async function handleErrors(errorMessage: string, statusCode: number) {
  console.error(errorMessage);
  return new NextResponse(errorMessage, { status: statusCode });
}

async function isAuthorized() {
  const session = await getAuthSession();
  if (!session) {
    return handleErrors("Not Authenticated!", 401);
  } else if (session.user.role !== "ADMIN") {
    return handleErrors("Not Authorized!", 401);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    isAuthorized();
    const body = await request.json();
    const note = await prisma.note.findUnique({
      where: { slug: params.slug },
    });
    if (!note) return handleErrors("Invalid Post", 404);
    const validation = createNotesSchema.safeParse(body);
    if (!validation.success) return handleErrors("Invalid Data", 400);
    /** upload image to cloudinary */
    let thumbnail = {
      public_id: "",
      url: "",
    };

    if (body.image) {
      if (note.public_id) {
        await deleteImage(note.public_id);
      }
      thumbnail = await uploadImage(body.image);
    }
    const updateNote = await prisma.note.update({
      where: { slug: params.slug },
      data: {
        title: body.title,
        slug: createSlug(body.title),
        content: body.content,
        excerpt: body.excerpt,
        noteStatus: body.noteStatus,
        ...(body.image
          ? { public_id: thumbnail.public_id, url: thumbnail.url }
          : {}),
      },
    });
    return NextResponse.json(updateNote, { status: 200 });
  } catch (error) {
    return handleErrors("Internal Error", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    isAuthorized();
    const note = await prisma.note.findUnique({
      where: { slug: params.slug },
    });
    if (!note) return handleErrors("Invalid Post", 404);
    if (note.public_id) {
      await deleteImage(note.public_id);
    }
    await prisma.note.delete({
      where: { slug: params.slug },
    });
    return NextResponse.json({ message: "Note Deleted" }, { status: 200 });
  } catch (error) {
    return handleErrors("Internal Error", 500);
  }
}
