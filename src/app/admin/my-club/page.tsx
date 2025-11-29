import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { clubQueryOptions } from '@/app/_api/queries/club';

import ClubDetailClientPage from './_pages/ClubDetailClientPage';

export const metadata: Metadata = {
  title: '띵동 - 동아리 정보 관리',
};

export default async function ClubDetailPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(clubQueryOptions.my());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubDetailClientPage />
    </HydrationBoundary>
  );
}
