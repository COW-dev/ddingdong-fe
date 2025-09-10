'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Body1, Flex } from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';

import { FeedContainer } from '../_containers/FeedContainer';

import { ClubFeed } from './ClubFeed';

export function FeedClient() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(feedQueryOptions.all());

  const { observerTarget } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const feedData = data.pages.flatMap((page) => page.newestFeeds);

  return (
    <Flex justifyContent="center" alignItems="center" className="w-full">
      {feedData.length === 0 ? (
        <Body1 className="mt-40 text-gray-400">등록된 게시물이 없습니다.</Body1>
      ) : (
        <FeedContainer>
          <ClubFeed feeds={feedData} />
          <div
            ref={observerTarget}
            role="presentation"
            aria-hidden="true"
            className="h-5 w-full bg-transparent"
          />
        </FeedContainer>
      )}
    </Flex>
  );
}
