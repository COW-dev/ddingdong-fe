import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

import type {
  AdminFeedRankingApiRequest,
  ClubFeedRankingApiRequest,
} from '../types/ranking';

export const rankingQueryKeys = {
  all: () => ['ranking'] as const,
  feed: () => [...rankingQueryKeys.all(), 'feed'] as const,
  adminFeed: () => [...rankingQueryKeys.feed(), 'admin'] as const,
  clubFeed: () => [...rankingQueryKeys.feed(), 'club'] as const,

  adminFeedRanking: (year: number, month: number) =>
    [...rankingQueryKeys.adminFeed(), year, month] as const,
  clubFeedRanking: (year: number, month: number) =>
    [...rankingQueryKeys.clubFeed(), year, month] as const,
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
