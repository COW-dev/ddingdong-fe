import { ReportFixClientPage } from './_pages/ReportFixClientPage';
import { reportQueryOptions } from '@/app/_api/queries/report';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { term: string; name: string };
}): Promise<Metadata> {
  const { term, name } = await params;

  return {
    title: `띵동 - ${name} ${term}주차 활동보고서 수정하기`,
    description: `${name ?? '동아리'}의 ${term}주차 활동보고서 수정페이지입니다.`,
  };
}

export default async function ReportFixPage({
  params,
}: {
  params: { term: string; name: string };
}) {
  const { term, name } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(reportQueryOptions.termReport(Number(term)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReportFixClientPage term={Number(term)} name={name} />
    </HydrationBoundary>
  );
}
