import type { Metadata } from "next";
import { Suspense } from "react";
import { ArtworkCard } from "@/components/artwork-card";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SearchBar } from "@/components/search-bar";
import { requireUser } from "@/lib/auth";
import {
  getArtworks,
  getUserById,
  searchArtworks,
  toPublicUser,
} from "@/lib/db";

export const metadata: Metadata = {
  title: "Explore",
};

type Props = {
  searchParams: Promise<{ q?: string; tag?: string }>;
};

export default async function ExplorePage({ searchParams }: Props) {
  const user = await requireUser();
  const { q, tag } = await searchParams;

  let artworks = q ? await searchArtworks(q) : await getArtworks();
  if (tag) {
    artworks = artworks.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );
  }

  const allTags = Array.from(
    new Set((await getArtworks()).flatMap((a) => a.tags)),
  ).sort();

  const cards = (
    await Promise.all(
      artworks.map(async (artwork) => {
        const artist = await getUserById(artwork.userId);
        if (!artist) return null;
        return { artwork, artist: toPublicUser(artist) };
      }),
    )
  ).filter(Boolean) as {
    artwork: (typeof artworks)[number];
    artist: ReturnType<typeof toPublicUser>;
  }[];

  return (
    <>
      <Nav user={toPublicUser(user)} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta">
            Archives
          </p>
          <h1 className="display-font mt-1 text-4xl text-paper sm:text-5xl">
            Explore
          </h1>
          <p className="mt-2 text-sm text-muted">
            Search by title, medium, or feeling. Filter by tag.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-6">
          <Suspense fallback={<div className="h-12 w-full max-w-xl animate-pulse rounded-full bg-ink-muted" />}>
            <SearchBar />
          </Suspense>

          <div className="flex flex-wrap gap-2">
            <a
              href="/explore"
              className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wider transition ${
                !tag
                  ? "border-gold/50 bg-gold/15 text-gold"
                  : "border-line text-muted hover:border-gold/30 hover:text-gold"
              }`}
            >
              All
            </a>
            {allTags.map((t) => (
              <a
                key={t}
                href={`/explore?tag=${encodeURIComponent(t)}`}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wider transition ${
                  tag === t
                    ? "border-gold/50 bg-gold/15 text-gold"
                    : "border-line text-muted hover:border-gold/30 hover:text-gold"
                }`}
              >
                #{t}
              </a>
            ))}
          </div>
        </div>

        {(q || tag) && (
          <p className="mb-6 text-sm text-muted">
            Showing {cards.length} piece{cards.length === 1 ? "" : "s"}
            {q ? (
              <>
                {" "}
                for &ldquo;<span className="text-paper">{q}</span>&rdquo;
              </>
            ) : null}
            {tag ? (
              <>
                {" "}
                tagged <span className="text-gold">#{tag}</span>
              </>
            ) : null}
          </p>
        )}

        {cards.length === 0 ? (
          <div className="rounded-2xl border border-line bg-ink-soft/40 p-12 text-center">
            <p className="display-font text-2xl text-paper">Nothing found</p>
            <p className="mt-2 text-sm text-muted">
              Try another word, or clear filters.
            </p>
          </div>
        ) : (
          <div className="masonry">
            {cards.map(({ artwork, artist }) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                artist={artist}
                currentUserId={user.id}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
