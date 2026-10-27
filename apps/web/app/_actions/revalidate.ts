'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { CacheTag, isCacheTag } from '@/_constants/cacheTag';
import { ROLE_TYPE } from '@/_constants/role';

const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;

async function hasRevalidatePermission(token: string): Promise<boolean> {
  if (!API_ENDPOINT) return false;

  try {
    const res = await fetch(`${API_ENDPOINT}admin/clubs`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    return res.ok;
  } catch {
    return false;
  }
}

export async function revalidateCache(tag: CacheTag): Promise<void> {
  if (!isCacheTag(tag)) return;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const role = cookieStore.get('role')?.value;

  if (!token || role !== ROLE_TYPE.ROLE_ADMIN) return;

  const authorized = await hasRevalidatePermission(token);
  if (!authorized) return;

  revalidateTag(tag);
}
