// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const { pathname } = req.nextUrl;

//   const isAuthPage = pathname.startsWith("/auth");
//   const isJourneyPage = pathname.startsWith("/journey");

//   // Not logged in & not accessing public or /auth → redirect to /auth
//   if (!token && !isAuthPage && !isPublic(pathname)) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/auth";
//     return NextResponse.redirect(url);
//   }

//   // Logged in & trying to access /auth → redirect to /
//   if (token && isAuthPage) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/";
//     return NextResponse.redirect(url);
//   }

//   // Logged in but hasn't completed journey → redirect to /app/journey
//   // You'll need to include journeyComplete in the token first!
//   if (
//     token &&
//     token.journeyComplete === false &&
//     !isJourneyPage &&
//     !isAuthPage &&
//     !isPublic(pathname)
//   ) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/journey";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// // Define what routes are public
// function isPublic(pathname: string) {
//   return (
//     pathname.startsWith("/api") || // ✅ Make sure API routes are excluded
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/public") ||
//     pathname === "/"
//   );
// }

// export const config = {
//   matcher: [
//     // match all routes except these
//     "/((?!_next/static|_next/image|favicon.ico|assets|api|public).*)",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const isJourneyPage = pathname.startsWith("/journey");
  const isDashboardPage = pathname.startsWith("/dashboard") || pathname === "/";

  // Define public routes you want anonymous access to, adjust as needed:
  const publicRoutes = [
    "/",
    "/auth",
    "/journey",
    "/api",
    "/_next",
    "/favicon.ico",
    "/public",
  ];

  const isPublic = publicRoutes.some((path) => pathname.startsWith(path));

  // 1. If no token, redirect to /auth (unless on public page)
  if (!token && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // 2. If token and accessing /auth, redirect to dashboard/home
  if (token && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard"; // or "/" depending on your dashboard root
    return NextResponse.redirect(url);
  }

  // 3. If token but journey not complete, redirect to /journey
  if (
    token &&
    (token.journeyComplete === false || token.journeyComplete === undefined) && // Treat undefined as incomplete
    !isJourneyPage &&
    !isAuthPage
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/journey";
    return NextResponse.redirect(url);
  }

  // 4. If token and journey complete, and trying to access journey or auth, redirect to dashboard
  if (
    token &&
    token.journeyComplete === true &&
    (isAuthPage || isJourneyPage)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard"; // or "/"
    return NextResponse.redirect(url);
  }

  // Otherwise, allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|api|public).*)"],
};

