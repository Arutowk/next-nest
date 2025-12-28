import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function proxy(request: NextRequest) {
  const session = await getSession();
  if (!session || !session.user)
    return NextResponse.redirect(new URL("/auth/signin", request.url));
}

export const config = {
  matcher: "/user/:path*",
};
