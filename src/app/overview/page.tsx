import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { bannerQueryOptions } from '../_api/queries/banner';
import { clubQueryOptions } from '../_api/queries/club';

import { OverviewPageClient } from './_components/OverviewPageClient';

export default async function OverviewPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(clubQueryOptions.all()),
    queryClient.prefetchQuery(bannerQueryOptions.all()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OverviewPageClient />
    </HydrationBoundary>
  );
}
