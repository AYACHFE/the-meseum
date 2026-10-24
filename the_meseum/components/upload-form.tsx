"use client";

import { useActionState, useState } from "react";
import { submitArtwork } from "@/app/actions/artworks";
import type { ArtworkFormState } from "@/lib/types";

export function UploadForm() {
  const [state, formAction, pending] = useActionState<
    ArtworkFormState,
    FormData
  >(submitArtwork, undefined);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="label text-muted!" htmlFor="image">
          Artwork image
        </label>
        <div
          className={`relative overflow-hidden rounded-xl border-2 border-dashed transition ${
            preview
              ? "border-gold/40"
              : "border-line-strong hover:border-gold/30"
          }`}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="max-h-80 w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
              <span className="display-font text-4xl text-gold/70">◇</span>
              <p className="text-sm text-paper-dim">
                Drop your piece here or click to choose
              </p>
              <p className="text-xs text-muted">JPEG, PNG, WebP, GIF · max 5MB</p>
            </div>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
              else setPreview(null);
            }}
          />
        </div>
        {state?.errors?.image && (
          <p className="mt-2 text-sm text-terracotta">{state.errors.image[0]}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="field"
            placeholder="What do you call this piece?"
            required
          />
          {state?.errors?.title && (
            <p className="mt-1 text-sm text-terracotta">
              {state.errors.title[0]}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="medium">
            Medium
          </label>
          <input
            id="medium"
            name="medium"
            className="field"
            placeholder="Oil, digital, ceramic…"
            required
          />
          {state?.errors?.medium && (
            <p className="mt-1 text-sm text-terracotta">
              {state.errors.medium[0]}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="tags">
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            className="field"
            placeholder="abstract, night, texture"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="description">
            Artist statement
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="field resize-y"
            placeholder="Tell the story behind this work — process, feeling, idea…"
            required
          />
          {state?.errors?.description && (
            <p className="mt-1 text-sm text-terracotta">
              {state.errors.description[0]}
            </p>
          )}
        </div>
      </div>

      {state?.message && (
        <p className="text-sm text-terracotta">{state.message}</p>
      )}

      <button type="submit" disabled={pending} className="btn-terracotta w-full sm:w-auto">
        {pending ? "Hanging on the wall…" : "Exhibit this piece"}
      </button>
    </form>
  );
}
