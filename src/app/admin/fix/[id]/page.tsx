import { cookies } from 'next/headers';

import { Metadata } from 'next';

import { RoleType } from '@/constants/role';

import FIxDetailClientPage from './_pages/FIxDetailClientPage';

export const metadata: Metadata = {
  title: '띵동 - 동아리방 시설보수',
};

export default async function ReportNewPage({
  params,
}: {
  params: { id: string };
}) {
  const cookie = await cookies();
  const { id } = await params;
  return (
    <FIxDetailClientPage
      role={cookie.get('role')?.value as keyof RoleType}
      id={Number(id)}
    />
  );
}
