import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "museum_session";

const protectedRoutes = ["/gallery", "/upload", "/profile", "/explore"];
const authRoutes = ["/login", "/signup"];

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    "the-museum-dev-secret-change-in-production-please"
  );
}

function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;

  const expected = createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");

  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf-8"),
    ) as { userId?: string; expiresAt?: number };
    if (!payload.userId || !payload.expiresAt) return false;
    if (Date.now() > payload.expiresAt) return false;
    return true;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = isValidSession(token);

  const isProtected =
    protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    ) || pathname.startsWith("/artwork/");

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Public artwork pages are browseable; only require auth for upload-ish paths
  const needsAuth =
    protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

  if (needsAuth && !authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && authenticated) {
    return NextResponse.redirect(new URL("/gallery", request.url));
  }

  // Artwork detail is public for browsing culture — allow without auth
  void isProtected;

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|uploads/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
