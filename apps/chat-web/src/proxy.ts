import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import {
  APIAUTH_PREFIX,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/app/routeConfig";

export async function proxy(request: NextRequest) {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  const session = request.cookies.get("better-auth.session_token");

  const isLoggedIn = !!session;
  const { nextUrl } = request;

  const isApiAuthRoute = nextUrl.pathname.startsWith(APIAUTH_PREFIX);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return NextResponse.next();
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }
  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
