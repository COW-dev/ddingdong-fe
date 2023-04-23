import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const subdomain = req.headers.get('host')?.split('.')[0];

  if (subdomain === 'admin') {
    return NextResponse.rewrite(new URL('/admin', req.url));
  }
}

export const config = {
  matcher: ['/', '/login'],
};
