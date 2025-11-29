import { cookies } from 'next/headers';

import { RoleType } from '@/constants/role';

import { NoticeDetailAdminClientPage } from './_pages/NoticeDetailAdminClientPage';

export default async function NoticeAdminDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookie = await cookies();

  return (
    <NoticeDetailAdminClientPage
      role={cookie.get('role')?.value as keyof RoleType}
      noticeId={Number(id)}
    />
  );
}
