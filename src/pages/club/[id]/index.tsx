import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import type { GetServerSideProps } from 'next/types';
import BottomButton from '@/components/club/BottomButton';
import ClubHeading from '@/components/club/ClubHeading';
import ClubInfo from '@/components/club/ClubInfo';
import ClubFeed from '@/components/feed/ClubFeed';
import Tabs from '@/components/feed/Tabs';
import { OBSERVER_OPTIONS } from '@/constants/observer';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import { useClubInfo } from '@/hooks/api/club/useClubInfo';
import { useClubFeed } from '@/hooks/api/feed/useClubFeed';
import { TabMenu } from '@/types/feed';

type ClubDetailProps = {
  clubId: number;
};

export default function Index({ clubId }: ClubDetailProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { data: clubInfoData, isSuccess } = useClubInfo(clubId);
  const { data: allClubs } = useAllClubs();
  const {
    data: clubFeedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useClubFeed(clubId);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    if (activeTab === 1) {
      const observer = new IntersectionObserver(
        handleObserver,
        OBSERVER_OPTIONS,
      );
      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }
      return () => observer.disconnect();
    }
  }, [handleObserver, activeTab]);

  if (isSuccess && clubFeedData && allClubs) {
    const clubInfo = clubInfoData.data;
    const clubFeed = clubFeedData.pages.flatMap((page) => page.data.clubFeeds);
    const { name, formUrl } = clubInfo;

    const isRecruit =
      allClubs?.data.find((club) => club.name === name)?.recruitStatus ===
        '모집 중' && formUrl;

    const ClubTabMenus: TabMenu[] = [
      {
        label: '동아리 소개',
        content: (
          <ClubInfo
            introductionImageUrl={clubInfo.introductionImage}
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
            <>
              <ClubFeed feeds={clubFeed} />
              <div
                ref={observerTarget}
                className="mt-5 h-5 w-full bg-transparent"
              />
            </>
          ),
      },
    ];

    return (
      <>
        <Head>
          <title>{`띵동 - ${name}`}</title>
        </Head>
        <ClubHeading info={clubInfo} />
        <Tabs
          TabMenus={ClubTabMenus}
          tabContext="allClubs"
          onTabChange={(index) => setActiveTab(index)}
        />
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
