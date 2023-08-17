import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const subdomain = req.headers.get('host')?.split('.')[0];
  if (subdomain === 'admin') {
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
    '/admin/:path*',
    '/report/:path*',
  ],
};
