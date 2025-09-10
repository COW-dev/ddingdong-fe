import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { clubQueryOptions } from '@/app/_api/queries/club';
import { feedQueryOptions } from '@/app/_api/queries/feed';

import { ClubDetailClient } from './_components/ClubDetailClient';

export default async function ClubDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(clubQueryOptions.detail(id)),
    queryClient.prefetchQuery(feedQueryOptions.clubFeed(id)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubDetailClient id={id} />
    </HydrationBoundary>
  );
}
