import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const isJourneyPage = pathname.startsWith("/app/journey");

  // Not logged in & not accessing public or /auth → redirect to /auth
  if (!token && !isAuthPage && !isPublic(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // Logged in & trying to access /auth → redirect to /
  if (token && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Logged in but hasn't completed journey → redirect to /app/journey
  // You'll need to include journeyComplete in the token first!
  if (
    token &&
    token.journeyComplete === false &&
    !isJourneyPage &&
    !isAuthPage &&
    !isPublic(pathname)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/journey";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define what routes are public
function isPublic(pathname: string) {
  return (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname === "/"
  );
}

export const config = {
  matcher: [
    // run middleware on all routes except static files & public assets
    "/((?!_next/static|_next/image|favicon.ico|assets|public).*)",
  ],
};
