import { deleteImage, uploadImage } from "@/lib/upload";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "../../auth/authOptions";

async function handleErrors(errorMessage: string, statusCode: number) {
  console.error(errorMessage);
  return new NextResponse(errorMessage, { status: statusCode });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return handleErrors("Not Authenticated!", 401);
    }
    const body = await request.json();
    /** check user exist or not */
    const user = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    });

    if (!user) {
      return handleErrors("Unauthorized User", 401);
    }
    /** upload image to cloudinary */
    let avatar = {
      public_id: "",
      url: "",
    };

    if (body.image) {
      if (user.image_id) {
        await deleteImage(user.image_id);
      }
      avatar = await uploadImage(body.image);
    }

    /** update user */
    const response = await prisma.user.update({
      data: {
        name: body.name,
        ...(body.image
          ? { image_id: avatar.public_id, image: avatar.url }
          : {}),
      },
      where: {
        email: params.email,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    handleErrors("Internal Error", 500);
  }
}
