import { Metadata } from 'next';
import StatisticsClientPage from './_pages/StatisticsClientPage';
import { applyQueryOptions } from '@/app/_api/queries/apply';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export const metadata: Metadata = {
  title: '띵동 - 지원서 통계',
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(applyQueryOptions.statistics(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatisticsClientPage id={Number(id)} />
    </HydrationBoundary>
  );
}
