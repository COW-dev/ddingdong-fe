import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const subdomain = req.headers.get('host')?.split('.')[0];
  const cookie = req.headers.get('cookie');
  const hasToken = cookie?.includes('token=');

  if (subdomain === 'admin') {
    if (hasToken && req.nextUrl.pathname === '/login')
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    if (!hasToken && req.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
    }
    return NextResponse.rewrite(
      new URL(`/admin${req.nextUrl.pathname}`, req.nextUrl.origin),
    );
  } else {
    if (req.nextUrl.pathname === '/login')
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL(req.nextUrl.origin));
  }
  return NextResponse.next();
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
