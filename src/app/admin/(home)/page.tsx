'use client';

import { useCookie } from '@/app/_api/useCookie';

import AdminPage from './_pages/Admin';

export default function AdminHomePage() {
  const { cookie } = useCookie();

  return <AdminPage role={cookie.role} />;
}
