import { Suspense } from 'react';

import { Metadata } from 'next';

import { fetcher } from '@/app/_api/fetcher';
import { ClubDetail } from '@/app/_api/types/club';

import { ClubTabsClient } from './_components/ClubTabsClient';
import { ClubFeedTab } from './_components/server/ClubFeedTab';
import { ClubHeaderSection } from './_components/server/ClubHeaderSection';
import { ClubIntroTab } from './_components/server/ClubIntroTab';
import { ClubHeaderSkeleton } from './_components/skeleton/ClubHeaderSkeleton';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const clubId = Number(id);

  const clubData = await fetcher.get<ClubDetail>(`clubs/${clubId}`);

  return {
    title: `띵동 - ${clubData?.name ?? '동아리 소개'}`,
    description: `${clubData?.name ?? '동아리'}의 상세 소개 페이지입니다.`,
    openGraph: {
      images: [clubData?.profileImage?.cdnUrl ?? ''],
    },
  };
}

export default async function ClubDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const clubId = Number(id);

  return (
    <>
      <Suspense fallback={<ClubHeaderSkeleton />}>
        <ClubHeaderSection id={clubId} />
      </Suspense>
      <ClubTabsClient
        introTab={<ClubIntroTab id={clubId} />}
        feedTab={<ClubFeedTab id={clubId} />}
      />
    </>
  );
}
