"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/actions/profile";
import type { ProfileFormState, PublicUser } from "@/lib/types";

type Props = {
  user: PublicUser;
};

export function ProfileForm({ user }: Props) {
  const [state, formAction, pending] = useActionState<
    ProfileFormState,
    FormData
  >(updateProfile, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="label" htmlFor="name">
          Display name
        </label>
        <input
          id="name"
          name="name"
          className="field"
          defaultValue={user.name}
          required
        />
        {state?.errors?.name && (
          <p className="mt-1 text-sm text-terracotta">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <label className="label" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          className="field resize-y"
          defaultValue={user.bio}
          placeholder="A few words about your practice…"
        />
        {state?.errors?.bio && (
          <p className="mt-1 text-sm text-terracotta">{state.errors.bio[0]}</p>
        )}
      </div>
      {state?.success && (
        <p className="text-sm text-sage">{state.message}</p>
      )}
      <button type="submit" disabled={pending} className="btn-ghost">
        {pending ? "Saving…" : "Update profile"}
      </button>
    </form>
  );
}
