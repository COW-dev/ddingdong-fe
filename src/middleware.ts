import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const subdomain = req.headers.get('host')?.split('.')[0];
  const newURL = new URL(`/${subdomain}`, req.url);
  console.log(newURL);
  return NextResponse.rewrite(newURL);
}

export const config = {
  matcher: '/',
};
