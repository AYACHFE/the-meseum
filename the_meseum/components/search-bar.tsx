"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function SearchBar({ placeholder = "Search the collection…" }: { placeholder?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="relative w-full max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const q = String(fd.get("q") || "").trim();
        startTransition(() => {
          const url = q ? `/explore?q=${encodeURIComponent(q)}` : "/explore";
          router.push(url);
        });
      }}
    >
      <input
        name="q"
        defaultValue={params.get("q") ?? ""}
        placeholder={placeholder}
        className="field !rounded-full !pl-11 !pr-24"
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
        ⌕
      </span>
      <button
        type="submit"
        disabled={pending}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-gold/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink transition hover:bg-gold"
      >
        {pending ? "…" : "Seek"}
      </button>
    </form>
  );
}
