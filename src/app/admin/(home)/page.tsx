import { cookies } from 'next/headers';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { bannerQueryOptions } from '@/app/_api/queries/banner';
import { clubQueryOptions } from '@/app/_api/queries/club';
import { documentQueryOptions } from '@/app/_api/queries/document';
import { noticeQueryOptions } from '@/app/_api/queries/notice';
import { ROLE_TYPE, RoleType } from '@/constants/role';

import AdminPage from './_pages/AdminPage';

export default async function AdminHomePage() {
  const cookie = await cookies();
  const role = (cookie.get('role')?.value as keyof RoleType) || '';

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(documentQueryOptions.all(1)),
    queryClient.prefetchQuery(noticeQueryOptions.all(1)),
    queryClient.prefetchQuery(bannerQueryOptions.all()),
    ...(role === ROLE_TYPE.ROLE_CLUB
      ? [queryClient.prefetchQuery(clubQueryOptions.my())]
      : []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminPage role={role} />
    </HydrationBoundary>
  );
}
