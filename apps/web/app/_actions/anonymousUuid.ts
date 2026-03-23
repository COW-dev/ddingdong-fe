'use server';

import { cookies } from 'next/headers';

const ANONYMOUS_UUID_KEY = 'anonymous_uuid';
const COOKIE_MAX_AGE = 14 * 24 * 60 * 60; // 14일 (초 단위)

export async function getOrCreateAnonymousUuid(): Promise<string> {
  const cookieStore = await cookies();
  let uuid = cookieStore.get(ANONYMOUS_UUID_KEY)?.value;

  if (!uuid) {
    uuid = crypto.randomUUID();
    cookieStore.set(ANONYMOUS_UUID_KEY, uuid, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return uuid;
}

export async function getAnonymousUuid(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ANONYMOUS_UUID_KEY)?.value ?? null;
}
