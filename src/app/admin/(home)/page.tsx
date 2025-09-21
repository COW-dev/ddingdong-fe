'use client';

import { useCookie } from '@/app/_api/useCookie';

import AdminPage from './_pages/Admin';

export default function AdminHomePage() {
  const { getRole } = useCookie();

  return <AdminPage role={getRole()} />;
}
