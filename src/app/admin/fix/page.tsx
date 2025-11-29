import { cookies } from 'next/headers';

import { Metadata } from 'next';

import { RoleType } from '@/constants/role';

import FixClientPage from './_pages/FixClientPage';

export const metadata: Metadata = {
  title: '띵동 - 동아리방 시설보수',
};

export default async function ReportPage() {
  const cookie = await cookies();

  return <FixClientPage role={cookie.get('role')?.value as keyof RoleType} />;
}
