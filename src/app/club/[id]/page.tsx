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
  params: { id: string };
}) {
  const { id } = await params;
  const NumberId = Number(id);
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(clubQueryOptions.detail(NumberId)),
    queryClient.prefetchQuery(feedQueryOptions.clubFeed(NumberId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubDetailClient id={NumberId} />
    </HydrationBoundary>
  );
}
