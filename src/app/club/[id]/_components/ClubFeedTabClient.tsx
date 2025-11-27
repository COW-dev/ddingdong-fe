'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Body2 } from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';
import { ClubFeed } from '@/app/feeds/_components/ClubFeed';
import { FeedContainer } from '@/app/feeds/_containers/FeedContainer';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';

type ClubFeedTabClientProps = {
  clubId: number;
};

export function ClubFeedTabClient({ clubId }: ClubFeedTabClientProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(feedQueryOptions.clubFeed(clubId));

  const { observerTarget } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const feeds = data.pages.flatMap((page) => page.clubFeeds);

  if (!feeds || feeds.length === 0) {
    return (
      <Body2 className="py-20 text-center text-gray-500">
        아직 등록된 피드가 없어요.
      </Body2>
    );
  }

  return (
    <FeedContainer>
      <ClubFeed feeds={feeds} />
      <div
        ref={observerTarget}
        role="presentation"
        aria-hidden="true"
        className="h-5 w-full bg-transparent"
      />
    </FeedContainer>
  );
}
