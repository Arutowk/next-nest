import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

const protectedRoutes = ['/interview', '/user'];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => {
    pathname.startsWith(route);
  });

  if (!session && isProtected)
    return NextResponse.redirect(new URL('/sign-in', request.url));
}
