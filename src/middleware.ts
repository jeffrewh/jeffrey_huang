import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep the funny "password in URL" path visible while serving the wiki gate page
  if (pathname.startsWith("/wiki/pass=")) {
    return NextResponse.rewrite(new URL("/wiki", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wiki/:path*"],
};
