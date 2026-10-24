import Image from "next/image";
import Link from "next/link";
import type { Artwork, PublicUser } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Avatar } from "./avatar";
import { LikeButton } from "./like-button";

type Props = {
  artwork: Artwork;
  artist: PublicUser;
  currentUserId?: string | null;
  featured?: boolean;
};

export function ArtworkCard({
  artwork,
  artist,
  currentUserId,
  featured,
}: Props) {
  const liked = currentUserId
    ? artwork.likes.includes(currentUserId)
    : false;

  return (
    <article
      className={`masonry-item frame-card overflow-hidden rounded-sm ${
        featured ? "rotate-[-0.5deg]" : ""
      }`}
    >
      <Link href={`/artwork/${artwork.id}`} className="block group">
        <div className="frame-mat">
          <div className="relative overflow-hidden bg-ink-muted aspect-[4/5]">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {artwork.palette.slice(0, 4).map((c) => (
                <span
                  key={c}
                  className="palette-dot"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/artwork/${artwork.id}`}>
              <h3 className="display-font text-xl leading-tight text-paper hover:text-gold transition-colors truncate">
                {artwork.title}
              </h3>
            </Link>
            <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted">
              {artwork.medium}
            </p>
          </div>
          <LikeButton
            artworkId={artwork.id}
            liked={liked}
            count={artwork.likes.length}
            compact
          />
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-paper-dim/80">
          {artwork.description}
        </p>

        <div className="flex items-center justify-between gap-2 border-t border-line pt-3">
          <Link
            href={`/profile/${artist.username}`}
            className="flex min-w-0 items-center gap-2 hover:opacity-90"
          >
            <Avatar name={artist.name} color={artist.avatarColor} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm text-paper">{artist.name}</p>
              <p className="truncate text-xs text-muted">
                @{artist.username}
              </p>
            </div>
          </Link>
          <time className="shrink-0 text-[10px] uppercase tracking-wider text-muted">
            {formatDate(artwork.createdAt)}
          </time>
        </div>
      </div>
    </article>
  );
}
