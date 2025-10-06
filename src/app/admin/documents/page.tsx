import { cookies } from 'next/headers';

import { Metadata } from 'next';

import { RoleType } from '@/constants/role';

import { DocumentClientPage } from './_pages/DocumentClientPage';

export const metadata: Metadata = {
  title: '띵동 - 자료실',
};

export default async function DocumentsPage() {
  const cookie = await cookies();

  return (
    <DocumentClientPage role={cookie.get('role')?.value as keyof RoleType} />
  );
}
