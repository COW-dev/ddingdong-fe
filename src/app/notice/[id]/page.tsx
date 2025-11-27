import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { noticeQueryOptions } from '@/app/_api/queries/notice';

import { NoticeDetailClientPage } from './_pages/NoticeDetailClientPage';

export const metadata: Metadata = {
  title: `띵동 - 공지사항`,
  description: `공지사항 상세 페이지`,
};

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(noticeQueryOptions.detail(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeDetailClientPage id={Number(id)} />
    </HydrationBoundary>
  );
}
