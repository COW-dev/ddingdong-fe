import { cookies } from 'next/headers';

import { Metadata } from 'next';

import { NewFeedAdminClientPage } from './_pages/NewFeedAdminClientPage';

export const metadata: Metadata = {
  title: '띵동 어드민 - 피드 생성',
};

export default async function FeedAdminPage() {
  const cookie = await cookies();

  return <NewFeedAdminClientPage token={cookie.get('token')?.value ?? ''} />;
}
