import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="display-font mt-3 text-5xl text-paper">Room not found</h1>
      <p className="mt-3 max-w-md text-muted">
        This corridor of the museum doesn&apos;t exist — or the piece has been
        taken down.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Return to the entrance
      </Link>
    </main>
  );
}
