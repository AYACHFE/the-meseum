import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkCard } from "@/components/artwork-card";
import { Avatar } from "@/components/avatar";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { ProfileForm } from "@/components/profile-form";
import { requireUser } from "@/lib/auth";
import { getArtworksByUser, toPublicUser } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your studio",
};

export default async function ProfilePage() {
  const user = await requireUser();
  const artworks = await getArtworksByUser(user.id);
  const publicUser = toPublicUser(user, true);
  const totalLikes = artworks.reduce((sum, a) => sum + a.likes.length, 0);

  return (
    <>
      <Nav user={toPublicUser(user)} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-ink-soft/60 p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar
                  name={user.name}
                  color={user.avatarColor}
                  size="xl"
                />
                <h1 className="display-font mt-4 text-3xl text-paper">
                  {user.name}
                </h1>
                <p className="text-sm text-gold">@{user.username}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {user.bio}
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted">
                  Member since {formatDate(user.createdAt)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-6">
                <div className="rounded-xl bg-ink/40 p-3 text-center">
                  <p className="display-font text-2xl text-gold">
                    {artworks.length}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted">
                    Works
                  </p>
                </div>
                <div className="rounded-xl bg-ink/40 p-3 text-center">
                  <p className="display-font text-2xl text-terracotta">
                    {totalLikes}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted">
                    Likes
                  </p>
                </div>
              </div>

              <Link
                href={`/profile/${user.username}`}
                className="btn-ghost mt-6 w-full text-sm"
              >
                Public wall →
              </Link>
            </div>

            <div className="rounded-2xl border border-line bg-ink-soft/40 p-6">
              <h2 className="display-font text-xl text-paper">Edit studio</h2>
              <p className="mb-4 mt-1 text-xs text-muted">
                Update how you appear on wall labels.
              </p>
              <ProfileForm user={publicUser} />
            </div>
          </aside>

          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted">
                  Your collection
                </p>
                <h2 className="display-font text-3xl text-paper">
                  Hung works
                </h2>
              </div>
              <Link href="/upload" className="btn-primary !py-2 text-sm">
                + New piece
              </Link>
            </div>

            {artworks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line-strong p-12 text-center">
                <p className="display-font text-2xl text-paper">
                  Your wall is bare
                </p>
                <p className="mt-2 text-sm text-muted">
                  Upload your first piece and start the exhibition.
                </p>
                <Link href="/upload" className="btn-terracotta mt-6 inline-flex">
                  Exhibit something
                </Link>
              </div>
            ) : (
              <div className="masonry">
                {artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    artist={toPublicUser(user)}
                    currentUserId={user.id}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
