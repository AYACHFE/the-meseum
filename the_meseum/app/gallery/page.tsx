import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkCard } from "@/components/artwork-card";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { requireUser } from "@/lib/auth";
import { getArtworks, getUserById, toPublicUser } from "@/lib/db";

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const user = await requireUser();
  const artworks = await getArtworks();

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
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold/80">
              Main hall
            </p>
            <h1 className="display-font mt-1 text-4xl text-paper sm:text-5xl">
              The Gallery
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Fresh work from the community — textures, colors, and ideas hung
              for wandering eyes.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/explore" className="btn-ghost !py-2 text-sm">
              Explore
            </Link>
            <Link href="/upload" className="btn-primary !py-2 text-sm">
              + Exhibit
            </Link>
          </div>
        </div>

        {cards.length === 0 ? (
          <div className="paper-card rounded-2xl p-12 text-center">
            <p className="display-font text-3xl text-ink">Empty walls</p>
            <p className="mt-2 text-ink/60">
              Be the first to hang something beautiful.
            </p>
            <Link href="/upload" className="btn-primary mt-6 inline-flex">
              Upload a piece
            </Link>
          </div>
        ) : (
          <div className="masonry">
            {cards.map(({ artwork, artist }, i) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                artist={artist}
                currentUserId={user.id}
                featured={i < 3}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
