import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "../../auth/authOptions";
import prisma from "@/prisma/client";
import * as z from "zod";

const commentSchema = z.object({
  desc: z.string().min(1, "Please enter a comment"),
});

export const POST = async (request: NextRequest) => {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { message: "Not Authenticated!" },
      { status: 401 }
    );
  }
  try {
    const body = await request.json();
    const validation = await commentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const comments = await prisma.comment.create({
      data: {
        desc: body.desc,
        note: {
          connect: {
            id: body.noteId,
          },
        },
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });
    return NextResponse.json(comments, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.nextUrl);
  const noteId = searchParams.get("noteId");
  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(noteId && { noteId }),
      },
      include: {
        user: true,
      },
    });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
