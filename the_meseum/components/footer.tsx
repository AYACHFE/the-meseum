import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="display-font text-2xl text-paper">The Museum</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            A living gallery for creative minds — share ideas, textures, and
            visions with fellow artists.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
          <Link href="/gallery" className="hover:text-gold">
            Gallery
          </Link>
          <Link href="/explore" className="hover:text-gold">
            Explore
          </Link>
          <Link href="/signup" className="hover:text-gold">
            Join
          </Link>
          <span className="text-line-strong">·</span>
          <span className="text-xs uppercase tracking-[0.2em]">
            Est. forever
          </span>
        </div>
      </div>
    </footer>
  );
}
