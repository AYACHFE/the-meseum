"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { requireUser } from "@/lib/auth";
import {
  createArtwork,
  deleteArtwork,
  toggleLike,
} from "@/lib/db";
import { extractPalette, parseTags } from "@/lib/utils";
import { ArtworkFormSchema } from "@/lib/validations";
import type { ArtworkFormState } from "@/lib/types";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function submitArtwork(
  _state: ArtworkFormState,
  formData: FormData,
): Promise<ArtworkFormState> {
  const user = await requireUser();

  const validated = ArtworkFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    medium: formData.get("medium"),
    tags: formData.get("tags") || "",
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return { errors: { image: ["Please upload an image of your work."] } };
  }

  if (!ALLOWED_TYPES.has(image.type)) {
    return {
      errors: {
        image: ["Use a JPEG, PNG, WebP, or GIF image."],
      },
    };
  }

  if (image.size > MAX_IMAGE_BYTES) {
    return { errors: { image: ["Image must be under 5MB."] } };
  }

  const ext = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const filename = `${user.id}_${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await image.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), buffer);

  const { title, description, medium, tags } = validated.data;
  const artwork = await createArtwork({
    userId: user.id,
    title,
    description,
    medium,
    tags: parseTags(tags),
    imageUrl: `/uploads/${filename}`,
    palette: extractPalette(title + medium),
  });

  revalidatePath("/gallery");
  revalidatePath("/explore");
  revalidatePath("/profile");
  redirect(`/artwork/${artwork.id}`);
}

export async function likeArtwork(artworkId: string): Promise<void> {
  const user = await requireUser();
  await toggleLike(artworkId, user.id);
  revalidatePath("/gallery");
  revalidatePath(`/artwork/${artworkId}`);
  revalidatePath("/explore");
  revalidatePath("/profile");
}

export async function removeArtwork(artworkId: string): Promise<void> {
  const user = await requireUser();
  const ok = await deleteArtwork(artworkId, user.id);
  if (!ok) {
    throw new Error("Unable to delete this piece.");
  }
  revalidatePath("/gallery");
  revalidatePath("/explore");
  revalidatePath("/profile");
  redirect("/profile");
}
