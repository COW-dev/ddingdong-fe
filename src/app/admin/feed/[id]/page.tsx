import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { feedQueryOptions } from '@/app/_api/queries/feed';

import { FeedDetailAdminClientPage } from './_pages/FeedDetailAdminClientPage';

export default async function FeedDetailAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feedId = Number(id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(feedQueryOptions.detail(feedId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedDetailAdminClientPage feedId={feedId} />
    </HydrationBoundary>
  );
}
