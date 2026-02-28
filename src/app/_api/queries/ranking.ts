import { queryOptions } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

import type {
  AdminFeedRankingApiResponse,
  ClubFeedRankingApiResponse,
} from '../types/ranking';

export const rankingQueryKeys = {
  all: () => ['ranking'] as const,
  admin: () => [...rankingQueryKeys.all(), 'admin'] as const,
  club: () => [...rankingQueryKeys.all(), 'club'] as const,
  adminList: (year: number, month: number) =>
    [...rankingQueryKeys.admin(), year, month] as const,
  clubList: (year: number, month: number) =>
    [...rankingQueryKeys.club(), year, month] as const,
};

export const rankingQueryOptions = {
  adminList: (year: number, month: number) =>
    queryOptions({
      queryKey: rankingQueryKeys.adminList(year, month),
      queryFn: () =>
        fetcher.get<AdminFeedRankingApiResponse[]>(
          `admin/feeds/ranking?year=${year}&month=${month}`,
        ),
    }),
  clubList: (year: number, month: number) =>
    queryOptions({
      queryKey: rankingQueryKeys.clubList(year, month),
      queryFn: () =>
        fetcher.get<ClubFeedRankingApiResponse>(
          `central/feeds/status?year=${year}&month=${month}`,
        ),
    }),
};
