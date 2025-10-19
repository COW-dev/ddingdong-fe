import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { reportQueryOptions } from '@/app/_api/queries/report';

import { ReportClientPage } from './_pages/ReportClientPage';

export const metadata: Metadata = {
  title: '띵동 - 활동보고서',
};

export default async function ReportPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(reportQueryOptions.terms()),
    queryClient.prefetchQuery(reportQueryOptions.currentTerm()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReportClientPage />
    </HydrationBoundary>
  );
}
