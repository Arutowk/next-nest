import { auth } from '@/auth';

const protectedRoutes = ['dashboard'];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isPrivateRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.includes(route),
  );
  const isApiRoute = nextUrl.pathname.includes('/api');
  const isAuthRoute = nextUrl.pathname.includes('sign-');
  if (isApiRoute) return;
  if (isAuthRoute && !isLoggedIn) return;
  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL('/sign-in', req.url));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
