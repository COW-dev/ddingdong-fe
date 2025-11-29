import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { reportQueryOptions } from '@/app/_api/queries/report';

import { ReportDetailClientPage } from './_pages/ReportDetailClientPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string; name: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  return {
    title: `띵동 - ${term}주차 활동보고서`,
  };
}

export default async function ReportAdminTermNamePage({
  params,
}: {
  params: Promise<{ term: string; name: string }>;
}) {
  const { term, name } = await params;
  const decodedName = decodeURIComponent(name);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(reportQueryOptions.termReports(Number(term)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReportDetailClientPage term={Number(term)} name={decodedName} />
    </HydrationBoundary>
  );
}
