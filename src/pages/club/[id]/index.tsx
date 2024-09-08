import Head from 'next/head';
import type { GetServerSideProps } from 'next/types';
import BottomButton from '@/components/club/BottomButton';
import ClubHeading from '@/components/club/ClubHeading';
import ClubInfo from '@/components/club/ClubInfo';
import ClubFeed from '@/components/feed/ClubFeed';
import Tabs from '@/components/feed/Tabs';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import { useClubInfo } from '@/hooks/api/club/useClubInfo';
import { useClubFeed } from '@/hooks/api/feed/useClubFeed';
import { TabMenu } from '@/types/feed';
import { useEffect, useState } from 'react';

type ClubDetailProps = {
  clubId: number;
};

export default function Index({ clubId }: ClubDetailProps) {
  const { isError, isSuccess, data: clubInfoData } = useClubInfo(clubId);
  const { data: allClubs } = useAllClubs();
  const { data: clubFeedData } = useClubFeed(clubId);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (isSuccess && clubFeedData && allClubs) {
    const clubInfo = clubInfoData.data;
    const clubFeed = clubFeedData.data;
    const { name, formUrl } = clubInfo;

    const isRecruit =
      allClubs?.data.find((club) => club.name === name)?.recruitStatus ===
        '모집 중' && formUrl;

    const ClubTabMenus: TabMenu[] = [
      {
        label: '동아리 소개',
        content: (
          <ClubInfo
            introduceImageUrls={clubInfo.introduceImageUrls}
            introduction={clubInfo.introduction}
            activity={clubInfo.activity}
            ideal={clubInfo.ideal}
          />
        ),
      },
      {
        label: '활동 피드',
        content:
          clubFeed.length === 0 ? (
            <div className="flex w-full items-center justify-center">
              <div className="mt-20 text-base font-medium text-gray-500">
                등록된 게시물이 없습니다.
              </div>
            </div>
          ) : (
            <ClubFeed feeds={clubFeed} size="medium" />
          ),
      },
    ];

    return (
      <>
        <Head>
          <title>{`띵동 - ${name}`}</title>
        </Head>
        <ClubHeading info={clubInfo} />
        <Tabs TabMenus={ClubTabMenus} tabContext="allClubs" />
        <div className={`${!isRecruit && 'hidden'}`}>
          <BottomButton href={clubInfo.formUrl}>지원하기</BottomButton>
        </div>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
}) => {
  const { id } = context.query;

  return {
    props: {
      clubId: id,
    },
  };
};
