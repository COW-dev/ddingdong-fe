import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { noticeQueryOptions } from '../_api/queries/notice';

import { NoticeClientPage } from './_pages/NoticeClientPage';

export const metadata: Metadata = {
  title: '띵동 - 공지사항',
};

export default async function NoticePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(noticeQueryOptions.all(1));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeClientPage />
    </HydrationBoundary>
  );
}
