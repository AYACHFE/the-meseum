"use server";

import { redirect } from "next/navigation";
import { hash, compare } from "bcryptjs";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "@/lib/db";
import { createSession, destroySession } from "@/lib/session";
import { LoginFormSchema, SignupFormSchema } from "@/lib/validations";
import type { AuthFormState } from "@/lib/types";

export async function signup(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = SignupFormSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { name, username, email, password } = validated.data;

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return { message: "An account with this email already exists." };
  }

  const existingUsername = await getUserByUsername(username);
  if (existingUsername) {
    return { message: "That username is already taken." };
  }

  const passwordHash = await hash(password, 10);
  const user = await createUser({ name, username, email, passwordHash });
  await createSession(user.id);
  redirect("/gallery");
}

export async function login(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;
  const user = await getUserByEmail(email);

  if (!user) {
    return { message: "Invalid email or password." };
  }

  const valid = await compare(password, user.passwordHash);
  if (!valid) {
    return { message: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/gallery");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/");
}
