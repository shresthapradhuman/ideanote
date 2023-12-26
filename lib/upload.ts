import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  image: string
): Promise<{ public_id: string; url: string }> {
  const result = await cloudinary.uploader.upload(image);
  return { public_id: result.public_id, url: result.secure_url };
}

export async function deleteImage(public_id: string) {
  return await cloudinary.uploader.destroy(public_id);
}
