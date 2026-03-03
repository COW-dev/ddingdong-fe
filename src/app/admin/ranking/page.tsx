'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { Tabs, TabItem, Flex } from 'ddingdong-design-system';

import { rankingQueryOptions } from '@/app/_api/queries/ranking';

import { RankingHeader } from './_components/RankingHeader';
import { RankingTable } from './_components/RankingTable';
import { getRankingDate } from './utils/getRankingDate';

export default function RankingClientPage() {
  const { currentYear, currentMonth, lastMonthYear, lastMonthMonth } =
    getRankingDate();

  const [{ data: currentMonthRanking }, { data: lastMonthRanking }] =
    useSuspenseQueries({
      queries: [
        rankingQueryOptions.adminList(currentYear, currentMonth),
        rankingQueryOptions.adminList(lastMonthYear, lastMonthMonth),
      ],
    });

  const lastMonthData = lastMonthRanking.every((item) => item.totalScore === 0)
    ? []
    : (lastMonthRanking ?? []);

  return (
    <Flex className="w-full py-7 md:py-10" dir="col">
      <RankingHeader />
      <Flex className="mt-8 w-full">
        <Tabs defaultIndex={0} className="w-full">
          <TabItem label="이달의 랭킹">
            <Flex className="mt-[1.6rem]">
              <RankingTable data={currentMonthRanking} />
            </Flex>
          </TabItem>
          <TabItem label="지난달 랭킹">
            <Flex className="mt-[1.6rem]">
              <RankingTable data={lastMonthData} />
            </Flex>
          </TabItem>
        </Tabs>
      </Flex>
    </Flex>
  );
}
