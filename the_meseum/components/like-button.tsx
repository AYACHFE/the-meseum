"use client";

import { useTransition } from "react";
import { likeArtwork } from "@/app/actions/artworks";

type Props = {
  artworkId: string;
  liked: boolean;
  count: number;
  compact?: boolean;
};

export function LikeButton({ artworkId, liked, count, compact }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => likeArtwork(artworkId))}
      className={`group inline-flex items-center gap-1.5 rounded-full border transition ${
        liked
          ? "border-terracotta/50 bg-terracotta/15 text-terracotta"
          : "border-line-strong bg-ink/40 text-muted hover:border-gold/40 hover:text-gold"
      } ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"} ${
        pending ? "opacity-60" : ""
      }`}
      aria-label={liked ? "Unlike" : "Like"}
    >
      <span
        className={`transition-transform group-hover:scale-110 ${
          liked ? "text-terracotta" : ""
        }`}
      >
        {liked ? "♥" : "♡"}
      </span>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}
