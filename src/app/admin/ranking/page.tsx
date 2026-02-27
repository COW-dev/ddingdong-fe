'use client';

import { useQueries, useSuspenseQuery } from '@tanstack/react-query';
import { Tabs, TabItem, Flex } from 'ddingdong-design-system';

import { rankingQueryOptions } from '@/app/_api/queries/ranking';

import { RankingHeader } from './_components/RankingHeader';
import { RankingTable } from './_components/RankingTable';
import { getRankingDate } from './_hooks/getRankingDate';

export default function RankingClientPage() {
  const { currentYear, currentMonth, lastMonthYear, lastMonthMonth } =
    getRankingDate();

  const { data: thisMonthRanking } = useSuspenseQuery(
    rankingQueryOptions.adminFeed(currentYear, currentMonth),
  );

  const [{ data: lastMonthRanking }] = useQueries({
    queries: [rankingQueryOptions.adminFeed(lastMonthYear, lastMonthMonth)],
  });

  const lastMonthData = lastMonthRanking?.every((item) => item.totalScore === 0)
    ? []
    : (lastMonthRanking ?? []);

  return (
    <Flex className="flex w-full flex-col py-[3.2rem] md:py-[4.8rem]">
      <RankingHeader />
      <Flex className="mt-8 w-full">
        <Tabs defaultIndex={0} className="w-full">
          <TabItem label="이달의 랭킹">
            <Flex className="mt-[1.6rem]">
              <RankingTable data={thisMonthRanking} />
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
