import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname.startsWith("/login") && !!token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/dashboard") && !!token) {
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
  });
  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login"],
};
