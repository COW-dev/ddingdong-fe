'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { Tabs, TabItem } from 'ddingdong-design-system';

import { rankingQueryOptions } from '@/app/_api/queries/ranking';

import RankingHeader from '../_components/RankingHeader';
import RankingTable from '../_components/RankingTable';
import { useRankingDate } from '../_hooks/useRankingDate';

export default function AdminRankingPage() {
  const { currentYear, currentMonth, lastMonthYear, lastMonthMonth } =
    useRankingDate();

  const [{ data: thisMonthRankingData }, { data: lastMonthRankingData }] =
    useSuspenseQueries({
      queries: [
        rankingQueryOptions.feedRanking(currentYear, currentMonth),
        rankingQueryOptions.feedRanking(lastMonthYear, lastMonthMonth),
      ],
    });

  return (
    <div className="flex w-full flex-col py-[3.2rem] md:py-[4.8rem]">
      <RankingHeader />
      <div className="mt-8 w-full">
        <Tabs defaultIndex={0}>
          <TabItem label="이달의 랭킹">
            <div className="mt-[1.6rem]">
              <RankingTable data={thisMonthRankingData} />
            </div>
          </TabItem>
          <TabItem label="지난달 랭킹">
            <div className="mt-[1.6rem]">
              <RankingTable data={lastMonthRankingData} />
            </div>
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
}
