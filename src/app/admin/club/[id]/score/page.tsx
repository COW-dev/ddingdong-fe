import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { ScoreQueryOptions } from '@/app/_api/queries/score';

import ScorePageClient from './_components/ScorePageClient';

export const metadata: Metadata = {
  title: '띵동 - 동아리 점수 페이지',
};

export default async function FaqPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(ScoreQueryOptions.all());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScorePageClient />
    </HydrationBoundary>
  );
}
