"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, signup } from "@/app/actions/auth";
import type { AuthFormState } from "@/lib/types";

type Props = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: Props) {
  const action = mode === "login" ? login : signup;
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    action,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-5">
      {mode === "signup" && (
        <>
          <div>
            <label className="label" htmlFor="name">
              Display name
            </label>
            <input
              id="name"
              name="name"
              className="field-light"
              placeholder="Your artist name"
              required
            />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-rose-700">{state.errors.name[0]}</p>
            )}
          </div>
          <div>
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              className="field-light"
              placeholder="lowercase_handle"
              required
            />
            {state?.errors?.username && (
              <p className="mt-1 text-sm text-rose-700">
                {state.errors.username[0]}
              </p>
            )}
          </div>
        </>
      )}

      <div>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="field-light"
          placeholder="you@studio.art"
          required
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-rose-700">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="field-light"
          placeholder={
            mode === "signup" ? "8+ chars, letter & number" : "••••••••"
          }
          required
        />
        {state?.errors?.password && (
          <div className="mt-1 text-sm text-rose-700">
            {state.errors.password.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )}
      </div>

      {state?.message && (
        <p className="rounded-lg border border-rose/30 bg-rose/10 px-3 py-2 text-sm text-rose-800">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending
          ? "Opening the doors…"
          : mode === "login"
            ? "Enter the Museum"
            : "Claim your wall"}
      </button>

      <p className="text-center text-sm text-ink/60">
        {mode === "login" ? (
          <>
            New to the gallery?{" "}
            <Link href="/signup" className="font-medium text-indigo underline-offset-2 hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already exhibiting?{" "}
            <Link href="/login" className="font-medium text-indigo underline-offset-2 hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>

      {mode === "login" && (
        <p className="rounded-lg bg-ink/5 px-3 py-2 text-center text-xs text-ink/55">
          Demo: <span className="font-medium">luna@museum.art</span> /{" "}
          <span className="font-medium">museum123</span>
        </p>
      )}
    </form>
  );
}
