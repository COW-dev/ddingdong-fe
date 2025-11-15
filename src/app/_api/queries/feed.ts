import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { FeedDetail, FeedList } from '../types/feed';

export const feedQueryKeys = {
  all: () => ['feed'],
  my: () => [...feedQueryKeys.all(), 'my'],
  detail: (feedId: number) => [...feedQueryKeys.all(), 'detail', feedId],
  clubFeed: (clubId: number) => [...feedQueryKeys.all(), 'club', clubId],
};

export const feedQueryOptions = {
  all: () =>
    infiniteQueryOptions({
      queryKey: feedQueryKeys.all(),
      queryFn: ({ pageParam = -1 }) =>
        fetcher.get<FeedList>(`feeds?currentCursorId=${pageParam}&size=9`),
      getNextPageParam: (lastPage) => {
        if (lastPage.pagingInfo?.hasNext) {
          return lastPage.pagingInfo.nextCursorId;
        }
        return undefined;
      },
      initialPageParam: -1,
    }),
  detail: (feedId: number) =>
    queryOptions({
      queryKey: feedQueryKeys.detail(feedId),
      queryFn: () => fetcher.get<FeedDetail>(`feeds/${feedId}`),
    }),
  clubFeed: (clubId: number) =>
    queryOptions({
      queryKey: feedQueryKeys.clubFeed(clubId),
      queryFn: () =>
        fetcher.get<FeedList>(
          `clubs/${clubId}/feeds?currentCursorId=-1&size=9`,
        ),
    }),
  my: () =>
    infiniteQueryOptions({
      queryKey: feedQueryKeys.my(),
      queryFn: ({ pageParam = -1 }) =>
        fetcher.get<FeedList>(
          `central/my/feeds?currentCursorId=${pageParam}&size=9`,
        ),
      getNextPageParam: (lastPage) => {
        if (lastPage.pagingInfo?.hasNext) {
          return lastPage.pagingInfo.nextCursorId;
        }
        return undefined;
      },
      initialPageParam: -1,
    }),
};
