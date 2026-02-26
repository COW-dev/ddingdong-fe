import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

import type {
  AdminFeedRankingApiRequest,
  ClubFeedRankingApiRequest,
} from '../types/ranking';

export const rankingQueryKeys = {
  all: () => ['ranking'],
  adminFeedRanking: (year: number, month: number) => [
    ...rankingQueryKeys.all(),
    'feed',
    year,
    month,
  ],
  clubFeedRanking: (year: number, month: number) => [
    ...rankingQueryKeys.all(),
    'feed',
    'club',
    year,
    month,
  ],
};

export const rankingQueryOptions = {
  adminFeedRanking: (year: number, month: number) =>
    queryOptions({
      queryKey: rankingQueryKeys.adminFeedRanking(year, month),
      queryFn: () =>
        fetcher.get<AdminFeedRankingApiRequest[]>(
          `admin/feeds/ranking?year=${year}&month=${month}`,
        ),
    }),
  clubFeedRanking: (year: number, month: number) =>
    queryOptions({
      queryKey: rankingQueryKeys.clubFeedRanking(year, month),
      queryFn: () =>
        fetcher.get<ClubFeedRankingApiRequest>(
          `central/feeds/status?year=${year}&month=${month}`,
        ),
    }),
};
