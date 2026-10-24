import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkCard } from "@/components/artwork-card";
import { Avatar } from "@/components/avatar";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { getCurrentUser } from "@/lib/auth";
import {
  getArtworksByUser,
  getUserByUsername,
  toPublicUser,
} from "@/lib/db";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const artist = await getUserByUsername(username);
  return {
    title: artist ? `${artist.name}'s wall` : "Artist",
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const artist = await getUserByUsername(username);
  if (!artist) notFound();

  const currentUser = await getCurrentUser();
  const artworks = await getArtworksByUser(artist.id);
  const totalLikes = artworks.reduce((sum, a) => sum + a.likes.length, 0);
  const isSelf = currentUser?.id === artist.id;

  return (
    <>
      <Nav user={currentUser ? toPublicUser(currentUser) : null} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-line bg-ink-soft/50 p-8 sm:p-10">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${artist.avatarColor}55, transparent 55%)`,
            }}
          />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Avatar name={artist.name} color={artist.avatarColor} size="xl" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.25em] text-gold/80">
                Artist wall
              </p>
              <h1 className="display-font mt-1 text-4xl text-paper sm:text-5xl">
                {artist.name}
              </h1>
              <p className="mt-1 text-sm text-muted">@{artist.username}</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-dim/90">
                {artist.bio}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
                <span>
                  <strong className="text-gold">{artworks.length}</strong> works
                </span>
                <span>
                  <strong className="text-terracotta">{totalLikes}</strong> likes
                </span>
                <span>Since {formatDate(artist.createdAt)}</span>
              </div>
            </div>
            {isSelf && (
              <Link href="/profile" className="btn-ghost text-sm">
                Edit studio
              </Link>
            )}
          </div>
        </div>

        {artworks.length === 0 ? (
          <div className="rounded-2xl border border-line p-12 text-center">
            <p className="display-font text-2xl text-paper">No works yet</p>
            <p className="mt-2 text-sm text-muted">
              This wall is waiting for its first hanging.
            </p>
          </div>
        ) : (
          <div className="masonry">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                artist={toPublicUser(artist)}
                currentUserId={currentUser?.id}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
