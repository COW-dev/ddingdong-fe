import { cookies } from 'next/headers';

import { Metadata } from 'next';

import { RoleType } from '@/constants/role';
import BannerClientPage from './_pages/BannerClientPage';

export const metadata: Metadata = {
  title: '띵동 - 배너 관리',
};

export default async function BannerPage() {
  const cookie = await cookies();

  return (
    <BannerClientPage role={cookie.get('role')?.value as keyof RoleType} />
  );
}
