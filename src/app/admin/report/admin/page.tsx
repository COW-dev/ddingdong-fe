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
  await queryClient.prefetchQuery(reportQueryOptions.terms());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReportClientPage />
    </HydrationBoundary>
  );
}
