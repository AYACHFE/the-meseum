import Link from "next/link";
import { logout } from "@/app/actions/auth";
import type { PublicUser } from "@/lib/types";
import { Avatar } from "./avatar";

type Props = {
  user?: PublicUser | null;
};

const links = [
  { href: "/gallery", label: "Gallery" },
  { href: "/explore", label: "Explore" },
  { href: "/upload", label: "Exhibit" },
];

export function Nav({ user }: Props) {
  return (
    <header className="nav-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={user ? "/gallery" : "/"} className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ink-soft text-gold shadow-[0_0_20px_rgba(201,162,39,0.15)]">
            <span className="display-font text-lg leading-none">M</span>
          </span>
          <div className="hidden sm:block">
            <p className="display-font text-xl leading-none text-paper group-hover:text-gold transition-colors">
              The Museum
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
              of living ideas
            </p>
          </div>
        </Link>

        {user ? (
          <>
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-paper-dim transition hover:bg-white/5 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/upload"
                className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex"
              >
                + New piece
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 transition hover:border-gold/30"
              >
                <Avatar name={user.name} color={user.avatarColor} size="sm" />
                <span className="hidden text-sm text-paper sm:inline">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full border border-line px-3 py-2 text-xs uppercase tracking-wider text-muted transition hover:border-rose/40 hover:text-rose"
                >
                  Exit
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="btn-ghost !px-4 !py-2 text-sm">
              Enter
            </Link>
            <Link href="/signup" className="btn-primary !px-4 !py-2 text-sm">
              Join the gallery
            </Link>
          </div>
        )}
      </div>

      {user && (
        <nav className="flex border-t border-line md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-1 py-2.5 text-center text-xs uppercase tracking-wider text-muted hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
