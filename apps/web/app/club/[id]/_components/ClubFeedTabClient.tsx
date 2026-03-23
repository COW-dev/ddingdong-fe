'use client';

import { Body2 } from '@dds/shared';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { feedQueryOptions } from '@/_api/queries/feed';
import { useInfiniteScroll } from '@/_hooks/useInfiniteScroll';
import { ClubFeed } from '@/feeds/_components/ClubFeed';
import { FeedContainer } from '@/feeds/_containers/FeedContainer';

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
