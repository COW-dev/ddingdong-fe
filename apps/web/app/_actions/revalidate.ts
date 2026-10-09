'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { CacheTag, isCacheTag } from '@/_constants/cacheTag';

export async function revalidateCache(tag: CacheTag): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token || !isCacheTag(tag)) return;

  revalidateTag(tag);
}
