import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isOnLogin = req.nextUrl.pathname === '/admin/login';

  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return Response.redirect(new URL('/admin/login', req.nextUrl));
  }

  if (isOnLogin && isLoggedIn) {
    return Response.redirect(new URL('/admin', req.nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
