import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const userRole = (req.auth?.user as any)?.role;

  // 1. Protect Admin Dashboard
  if (nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2. Protect Ground Terminal
  if (nextUrl.pathname.startsWith("/ground") && !isLoggedIn) {
     return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/ground/:path*"],
};
