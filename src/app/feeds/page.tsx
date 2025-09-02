import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { feedQueryOptions } from '../_api/queries/feed';

import { FeedClient } from './_components/FeedClient';

export const metadata: Metadata = {
  title: '띵동 - 동아리 피드',
};

export default async function FeedPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(feedQueryOptions.all());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedClient />
    </HydrationBoundary>
  );
}
