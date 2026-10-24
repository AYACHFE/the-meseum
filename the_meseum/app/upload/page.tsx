import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { UploadForm } from "@/components/upload-form";
import { requireUser } from "@/lib/auth";
import { toPublicUser } from "@/lib/db";

export const metadata: Metadata = {
  title: "Exhibit",
};

export default async function UploadPage() {
  const user = await requireUser();

  return (
    <>
      <Nav user={toPublicUser(user)} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta">
            New exhibition
          </p>
          <h1 className="display-font mt-1 text-4xl text-paper sm:text-5xl">
            Hang a piece
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Upload an image and write a short statement. Every submission
            becomes part of the living collection.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-ink-soft/60 p-6 sm:p-8">
          <UploadForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
