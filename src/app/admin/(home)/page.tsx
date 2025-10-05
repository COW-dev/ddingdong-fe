'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useCookie } from '@/app/_api/useCookie';

import AdminPage from './_pages/Admin';

export default function AdminHomePage() {
  const { cookie } = useCookie();
  const router = useRouter();

  useEffect(() => {
    if (!cookie.role || !cookie.token) {
      router.replace('/login');
    }
  }, [cookie.role, cookie.token, router]);

  return <AdminPage role={cookie.role} />;
}
