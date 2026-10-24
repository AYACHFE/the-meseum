import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { DeleteButton } from "@/components/delete-button";
import { Footer } from "@/components/footer";
import { LikeButton } from "@/components/like-button";
import { Nav } from "@/components/nav";
import { getCurrentUser } from "@/lib/auth";
import { getArtworkById, getUserById, toPublicUser } from "@/lib/db";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtworkById(id);
  return {
    title: artwork?.title ?? "Artwork",
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { id } = await params;
  const artwork = await getArtworkById(id);
  if (!artwork) notFound();

  const artist = await getUserById(artwork.userId);
  if (!artist) notFound();

  const currentUser = await getCurrentUser();
  const isOwner = currentUser?.id === artwork.userId;
  const liked = currentUser
    ? artwork.likes.includes(currentUser.id)
    : false;

  return (
    <>
      <Nav user={currentUser ? toPublicUser(currentUser) : null} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/gallery"
          className="mb-6 inline-flex text-xs uppercase tracking-[0.2em] text-muted transition hover:text-gold"
        >
          ← Back to gallery
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="frame-card overflow-hidden rounded-sm">
            <div className="frame-mat">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-muted sm:aspect-square">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.25em] text-gold/80">
              {artwork.medium}
            </p>
            <h1 className="display-font mt-2 text-4xl leading-tight text-paper sm:text-5xl">
              {artwork.title}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href={`/profile/${artist.username}`}
                className="flex items-center gap-3 rounded-full border border-line py-1.5 pl-1.5 pr-4 transition hover:border-gold/30"
              >
                <Avatar
                  name={artist.name}
                  color={artist.avatarColor}
                  size="md"
                />
                <div>
                  <p className="text-sm text-paper">{artist.name}</p>
                  <p className="text-xs text-muted">@{artist.username}</p>
                </div>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {currentUser ? (
                <LikeButton
                  artworkId={artwork.id}
                  liked={liked}
                  count={artwork.likes.length}
                />
              ) : (
                <span className="rounded-full border border-line px-3 py-1.5 text-sm text-muted">
                  ♡ {artwork.likes.length}
                </span>
              )}
              <time className="text-xs uppercase tracking-wider text-muted">
                Exhibited {formatDate(artwork.createdAt)}
              </time>
            </div>

            <div className="mt-8 space-y-3 border-t border-line pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Artist statement
              </p>
              <p className="text-base leading-relaxed text-paper-dim/90">
                {artwork.description}
              </p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
                Palette
              </p>
              <div className="flex flex-wrap gap-2">
                {artwork.palette.map((c) => (
                  <div key={c} className="flex items-center gap-2 rounded-full border border-line bg-ink/40 px-2 py-1">
                    <span
                      className="h-5 w-5 rounded-full border border-white/20"
                      style={{ backgroundColor: c }}
                    />
                    <span className="font-mono text-[10px] text-muted">
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {artwork.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/explore?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-wider text-muted transition hover:border-gold/40 hover:text-gold"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {isOwner && (
              <div className="mt-10 border-t border-line pt-6">
                <DeleteButton artworkId={artwork.id} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
