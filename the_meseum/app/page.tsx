import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getCurrentPublicUser } from "@/lib/auth";
import { getArtworks, getUserById, toPublicUser } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const user = await getCurrentPublicUser();
  if (user) redirect("/gallery");

  const artworks = (await getArtworks()).slice(0, 6);
  const featured = await Promise.all(
    artworks.map(async (a) => {
      const artist = await getUserById(a.userId);
      return { artwork: a, artist: artist ? toPublicUser(artist) : null };
    }),
  );

  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo/20 blur-3xl" />
          <div className="absolute -right-10 top-40 h-64 w-64 rounded-full bg-terracotta/15 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <p className="divider-ornament mb-6 max-w-xs text-[10px]">
                A sanctuary for makers
              </p>
              <h1 className="display-font text-5xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl">
                Where creative
                <br />
                <span className="gold-text italic">ideas</span> find
                <br />
                their wall.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-dim/85">
                The Museum is a living gallery — upload your art and ideas,
                wander other artists&apos; rooms, and build a collection that
                feels handcrafted, textured, and alive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup" className="btn-primary">
                  Open your studio
                </Link>
                <Link href="/login" className="btn-ghost">
                  Enter as guest artist
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted">
                <div>
                  <p className="display-font text-3xl text-gold">∞</p>
                  <p className="mt-1 uppercase tracking-wider text-[10px]">
                    Ideas welcome
                  </p>
                </div>
                <div className="h-10 w-px bg-line" />
                <div>
                  <p className="display-font text-3xl text-terracotta">10+</p>
                  <p className="mt-1 uppercase tracking-wider text-[10px]">
                    Seeded works
                  </p>
                </div>
                <div className="h-10 w-px bg-line" />
                <div>
                  <p className="display-font text-3xl text-sage">✦</p>
                  <p className="mt-1 uppercase tracking-wider text-[10px]">
                    Texture first
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md animate-fade-up stagger-2 lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/10 via-transparent to-terracotta/10 blur-xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {featured.slice(0, 4).map(({ artwork, artist }, i) =>
                  artist ? (
                    <div
                      key={artwork.id}
                      className={`frame-card overflow-hidden rounded-sm ${
                        i % 2 === 1 ? "mt-8 animate-float" : ""
                      }`}
                      style={i % 2 === 1 ? { animationDelay: `${i * 0.4}s` } : undefined}
                    >
                      <div className="frame-mat p-1.5!">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <Image
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            fill
                            className="object-cover"
                            sizes="200px"
                            priority={i < 2}
                          />
                        </div>
                      </div>
                      <div className="px-3 py-2">
                        <p className="display-font truncate text-sm text-paper">
                          {artwork.title}
                        </p>
                        <p className="truncate text-[10px] text-muted">
                          {artist.name}
                        </p>
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Manifesto strip */}
        <section className="border-y border-line bg-ink-soft/50">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              {
                title: "Exhibit",
                body: "Hang your paintings, photos, sketches, and wild ideas on a wall that feels like a real gallery.",
                accent: "text-gold",
              },
              {
                title: "Wander",
                body: "Browse a textured feed of fellow makers. Like, explore tags, and discover new palettes.",
                accent: "text-terracotta",
              },
              {
                title: "Belong",
                body: "Craft a profile that reads like a wall label — name, bio, and the body of work that is yours.",
                accent: "text-sage",
              },
            ].map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <p className={`display-font text-3xl ${item.accent}`}>
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Color story */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="paper-card relative overflow-hidden rounded-2xl p-8 sm:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
            <div className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-indigo/15 blur-2xl" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-ink/50">
                  The palette
                </p>
                <h2 className="display-font mt-2 text-4xl text-ink sm:text-5xl">
                  Built like a studio wall
                </h2>
                <p className="mt-4 text-ink/70 leading-relaxed">
                  Gold leaf labels, terracotta warmth, indigo shadows, and paper
                  grain — every surface is designed to feel handmade. This is
                  not another sterile feed; it is a room you walk into.
                </p>
                <Link href="/signup" className="btn-primary mt-6 inline-flex">
                  Start exhibiting
                </Link>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { c: "#c9a227", n: "Gold leaf" },
                  { c: "#c45c26", n: "Terracotta" },
                  { c: "#3d4f7c", n: "Indigo" },
                  { c: "#6b8f71", n: "Sage" },
                  { c: "#8b3a4a", n: "Rose madder" },
                  { c: "#f5f0e8", n: "Paper" },
                  { c: "#0c0a09", n: "Ink" },
                  { c: "#e8a87c", n: "Warm clay" },
                ].map((swatch) => (
                  <div key={swatch.n} className="text-center">
                    <div
                      className="mx-auto aspect-square rounded-xl border border-ink/10 shadow-inner"
                      style={{ backgroundColor: swatch.c }}
                    />
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-ink/55">
                      {swatch.n}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
