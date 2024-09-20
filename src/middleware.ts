import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value;

  // If user is on a public path and is already authenticated, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If user is not authenticated and tries to access a protected path, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If neither condition matches, proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
