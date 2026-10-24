"use client";

import { useTransition } from "react";
import { removeArtwork } from "@/app/actions/artworks";

export function DeleteButton({ artworkId }: { artworkId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      className="rounded-full border border-rose/40 px-4 py-2 text-xs uppercase tracking-wider text-rose transition hover:bg-rose/10 disabled:opacity-50"
      onClick={() => {
        if (confirm("Remove this piece from the gallery?")) {
          startTransition(() => removeArtwork(artworkId));
        }
      }}
    >
      {pending ? "Removing…" : "Remove piece"}
    </button>
  );
}
