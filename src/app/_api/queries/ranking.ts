import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

import type { FeedRanking } from '../types/ranking';

export const rankingQueryKeys = {
  all: () => ['ranking'],
  feedRanking: (year?: number, month?: number) => [
    ...rankingQueryKeys.all(),
    'feed',
    year,
    month,
  ],
};

export const rankingQueryOptions = {
  feedRanking: (year: number, month: number) =>
    queryOptions({
      queryKey: rankingQueryKeys.feedRanking(year, month),
      queryFn: () =>
        fetcher.get<FeedRanking[]>(
          `admin/feeds/ranking?year=${year}&month=${month}`,
        ),
    }),
};
