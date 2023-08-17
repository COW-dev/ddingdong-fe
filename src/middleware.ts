import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLE_TYPE } from './constants/text';

export function middleware(req: NextRequest) {
  const subdomain = req.headers.get('host')?.split('.')[0];
  const cookie = req.headers.get('cookie');
  const hasToken = cookie?.includes('token=');
  const isClub = cookie?.includes(ROLE_TYPE.ROLE_CLUB);

  const allowedPaths = {
    [ROLE_TYPE.ROLE_ADMIN]: ['/club', '/notice/new', '/banner'],
    [ROLE_TYPE.ROLE_CLUB]: ['/my-club'],
  };

  const unablePath =
    allowedPaths[isClub ? ROLE_TYPE.ROLE_ADMIN : ROLE_TYPE.ROLE_CLUB];

  if (subdomain === 'admin') {
    if (hasToken && req.nextUrl.pathname === '/login')
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    if (!hasToken && req.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
    }
    if (unablePath.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
    return NextResponse.rewrite(
      new URL(`/admin${req.nextUrl.pathname}`, req.nextUrl.origin),
    );
  }
  if (req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL(req.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/notice/:path*',
    '/my-club',
    '/club',
    '/report',
    '/banner',
    '/admin/:path*',
    '/report/:path*',
  ],
};
