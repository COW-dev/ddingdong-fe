import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { clubQueryOptions } from '@/app/_api/queries/club';

import AdminClubsClient from './_components/AdminClubsClient';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '띵동 어드민 - 동아리 관리',
};

export default async function AdminClubsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(clubQueryOptions.admin());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminClubsClient />
    </HydrationBoundary>
  );
}
