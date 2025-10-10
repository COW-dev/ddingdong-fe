import { cookies } from 'next/headers';

import { Metadata } from 'next';

import { RoleType } from '@/constants/role';

import { FaqClientPage } from './_pages/FaqClientPage';

export const metadata: Metadata = {
  title: '띵동 - FAQ',
};

export default async function FAQPage() {
  const cookie = await cookies();

  return <FaqClientPage role={cookie.get('role')?.value as keyof RoleType} />;
}
