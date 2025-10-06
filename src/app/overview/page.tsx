import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { bannerQueryOptions } from '../_api/queries/banner';
import { clubQueryOptions } from '../_api/queries/club';

import { OverviewClientPage } from './_pages/OverviewClientPage';

export default async function OverviewPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 24 * 60 * 60 * 1000,
        gcTime: 7 * 24 * 60 * 60 * 1000,
      },
    },
  });

  await Promise.all([
    queryClient.prefetchQuery(clubQueryOptions.all()),
    queryClient.prefetchQuery(bannerQueryOptions.all()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OverviewClientPage />
    </HydrationBoundary>
  );
}
