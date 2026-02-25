import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

import { rankingQueryOptions } from '@/app/_api/queries/ranking';
import type {
  AdminFeedRanking,
  ClubFeedRanking,
} from '@/app/_api/types/ranking';

import { getRankingDate } from './getRankingDate';

type UseMonthlyFeedRankingResult = {
  thisMonthRanking: AdminFeedRanking[];
  lastMonthRanking: AdminFeedRanking[];
};

export const useMonthlyFeedRanking = (): UseMonthlyFeedRankingResult => {
  const { currentYear, currentMonth, lastMonthYear, lastMonthMonth } =
    getRankingDate();

  const [{ data: thisMonthRankingData }, { data: lastMonthRankingData }] =
    useSuspenseQueries({
      queries: [
        rankingQueryOptions.adminFeedRanking(currentYear, currentMonth),
        rankingQueryOptions.adminFeedRanking(lastMonthYear, lastMonthMonth),
      ],
    });

  return {
    thisMonthRanking: thisMonthRankingData ?? [],
    lastMonthRanking: lastMonthRankingData ?? [],
  };
};

type UseClubFeedRankingResult = {
  clubRanking: ClubFeedRanking | null;
};

export const useClubFeedRanking = (): UseClubFeedRankingResult => {
  const { currentYear, currentMonth } = getRankingDate();
  const { data } = useSuspenseQuery(
    rankingQueryOptions.clubFeedRanking(currentYear, currentMonth),
  );

  return {
    clubRanking: data ?? null,
  };
};
