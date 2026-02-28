'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Body1, Flex } from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

import { ClubFeed } from '../_components/ClubFeed';
import { FeedContainer } from '../_containers/FeedContainer';

export function FeedClientPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(feedQueryOptions.all());

  const { observerTarget } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const feedData = data.pages.flatMap((page) => page.newestFeeds);

  if (feedData.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" className="w-full">
        <Body1 className="mt-40 text-gray-400">등록된 게시물이 없습니다.</Body1>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center" alignItems="center" className="w-full">
      <FeedContainer>
        <ClubFeed feeds={feedData} />
        <div
          ref={observerTarget}
          role="presentation"
          aria-hidden="true"
          className="h-5 w-full bg-transparent"
        />
      </FeedContainer>
    </Flex>
  );
}
