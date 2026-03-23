'use client';

import { Tabs, TabItem, Flex } from '@dds/shared';
import { useSuspenseQueries } from '@tanstack/react-query';

import { rankingQueryOptions } from '@/_api/queries/ranking';

import { RankingHeader } from './_components/RankingHeader';
import { RankingTable } from './_components/RankingTable';
import { getRankingDate } from './utils/getRankingDate';

export default function RankingClientPage() {
  const { currentYear, currentMonth, lastMonthYear, lastMonth } =
    getRankingDate();

  const [{ data: currentMonthRanking }, { data: lastMonthRanking }] =
    useSuspenseQueries({
      queries: [
        rankingQueryOptions.adminList(currentYear, currentMonth),
        rankingQueryOptions.adminSnapshotList(lastMonthYear, lastMonth),
      ],
    });

  const lastMonthData = (lastMonthRanking ?? []).filter(
    (item) => item.totalScore > 0,
  );

  return (
    <Flex className="w-full py-7 md:py-10" dir="col">
      <RankingHeader />
      <Flex className="mt-8 w-full">
        <Tabs defaultIndex={0} className="w-full">
          <TabItem label="이달의 랭킹">
            <Flex className="mt-6">
              <RankingTable data={currentMonthRanking} />
            </Flex>
          </TabItem>
          <TabItem label="지난달 랭킹">
            <Flex className="mt-6">
              <RankingTable data={lastMonthData} />
            </Flex>
          </TabItem>
        </Tabs>
      </Flex>
    </Flex>
  );
}
