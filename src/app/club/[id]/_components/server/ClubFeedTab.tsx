import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { feedQueryOptions } from '@/app/_api/queries/feed';

import { ClubFeedTabClient } from '../ClubFeedTabClient';

export async function ClubFeedTab({ id }: { id: number }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(feedQueryOptions.clubFeed(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubFeedTabClient clubId={id} />
    </HydrationBoundary>
  );
}
