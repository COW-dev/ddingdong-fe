'use client';

import dynamic from 'next/dynamic';

import { useCookie } from '@/app/_api/useCookie';

const AdminPage = dynamic(() => import('./_pages/AdminPage'), {
  ssr: false,
});

export default function AdminHomePage() {
  const { cookie } = useCookie();

  return <AdminPage role={cookie.role} />;
}
