import { cookies } from 'next/headers';

import { Metadata } from 'next';

import { RoleType } from '@/constants/role';

import { NoticeAdminClientPage } from './_pages/NoticeAdminClientPage';

export const metadata: Metadata = {
  title: '띵동 어드민 - 공지사항',
};

export default async function NoticeAdminPage() {
  const cookie = await cookies();

  return (
    <NoticeAdminClientPage role={cookie.get('role')?.value as keyof RoleType} />
  );
}
