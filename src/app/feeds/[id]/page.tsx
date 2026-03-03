import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { fetcher } from '@/app/_api/fetcher';
import { feedQueryOptions } from '@/app/_api/queries/feed';
import { FeedDetail } from '@/app/_api/types/feed';

import { FeedDetailClientPage } from './_pages/FeedDetailClientPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const feedId = Number(id);

  const clubData = await fetcher.get<FeedDetail>(`feeds/${feedId}`);

  return {
    title: `띵동 - ${clubData?.clubProfile.name ?? '피드 상세'} 페이지`,
    description: `${clubData?.clubProfile.name ?? '동아리'}의 상세 소개 페이지입니다.`,
    openGraph: {
      images: [clubData?.clubProfile.profileImageOriginUrl ?? ''],
    },
  };
}

export default async function FeedDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feedId = Number(id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(feedQueryOptions.detail(feedId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedDetailClientPage feedId={feedId} />
    </HydrationBoundary>
  );
}
