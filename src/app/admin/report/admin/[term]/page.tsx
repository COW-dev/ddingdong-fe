import { ReportTermClientPage } from './_pages/ReportTermClientPage';
import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { clubQueryOptions } from '@/app/_api/queries/club';
import { reportQueryOptions } from '@/app/_api/queries/report';

export async function generateMetadata({
  params,
}: {
  params: { term: string };
}): Promise<Metadata> {
  const { term } = await params;
  return {
    title: `띵동 - ${term}주차 활동보고서`,
  };
}

export default async function ReportAdminTermPage({
  params,
}: {
  params: { term: string };
}) {
  const { term } = params;

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(clubQueryOptions.all()),
    queryClient.prefetchQuery(reportQueryOptions.termReports(Number(term))),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReportTermClientPage term={Number(term)} />
    </HydrationBoundary>
  );
}
