'use server';

import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('token');
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('role');
};
