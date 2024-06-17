import { NextResponse } from "next/server";
import { verifyAccessToken } from "./db/accessToken";

// authorization
export function middleware(request) {
  const accessToken = request.cookies.get("accessToken");

  if (accessToken) {
    if (verifyAccessToken(accessToken.value)) {
      return NextResponse.next();
    } else {
      // Invalid token. Delete cookie and redirect to login page.
      request.cookies.delete("accessToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // if unprotected routes, continue
    if (request.url.endsWith("login") || request.url.endsWith("register")) {
      return NextResponse.next();
    } else {
      // Redirect to login page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
