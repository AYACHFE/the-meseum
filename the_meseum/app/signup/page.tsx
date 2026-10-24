import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Join",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
            <span className="display-font text-2xl">M</span>
          </span>
          <span className="display-font text-2xl text-paper">The Museum</span>
        </Link>
      </div>

      <div className="paper-card w-full max-w-md rounded-2xl p-8 sm:p-10">
        <h1 className="display-font text-3xl text-ink">Claim your wall</h1>
        <p className="mt-2 text-sm text-ink/60">
          Create an artist account and start hanging work.
        </p>
        <div className="mt-8">
          <AuthForm mode="signup" />
        </div>
      </div>
    </main>
  );
}
