import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { clubQueryOptions } from '@/app/_api/queries/club';
import { feedQueryOptions } from '@/app/_api/queries/feed';

import { ClubDetailClient } from './_components/ClubDetailClient';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const clubId = Number(id);

  const queryClient = new QueryClient();
  const clubQuery = clubQueryOptions.detail(clubId);

  const clubData = await queryClient.fetchQuery(clubQuery);

  return {
    title: `띵동 - ${clubData?.name ?? '동아리 소개'}`,
    description: `${clubData?.name ?? '동아리'}의 상세 소개 페이지입니다.`,
  };
}

export default async function ClubDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const clubId = Number(id);
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(clubQueryOptions.detail(clubId)),
    queryClient.prefetchQuery(feedQueryOptions.clubFeed(clubId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClubDetailClient id={clubId} />
    </HydrationBoundary>
  );
}
