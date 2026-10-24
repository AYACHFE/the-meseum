import { redirect } from "next/navigation";
import { getSession } from "./session";
import { getUserById, toPublicUser } from "./db";
import type { PublicUser, User } from "./types";

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;
  const user = await getUserById(session.userId);
  return user ?? null;
}

export async function getCurrentPublicUser(
  includeEmail = false,
): Promise<PublicUser | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  return toPublicUser(user, includeEmail);
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
