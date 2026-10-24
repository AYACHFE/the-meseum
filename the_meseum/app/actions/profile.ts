"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { updateUser } from "@/lib/db";
import { ProfileFormSchema } from "@/lib/validations";
import type { ProfileFormState } from "@/lib/types";

export async function updateProfile(
  _state: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const user = await requireUser();

  const validated = ProfileFormSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio") || "",
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { name, bio } = validated.data;
  await updateUser(user.id, { name, bio });

  revalidatePath("/profile");
  revalidatePath(`/profile/${user.username}`);
  revalidatePath("/gallery");

  return { success: true, message: "Profile updated." };
}
