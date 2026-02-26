'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Tabs, TabItem, Flex } from 'ddingdong-design-system';

import { rankingQueryOptions } from '@/app/_api/queries/ranking';

import { RankingHeader } from './_components/RankingHeader';
import { RankingTable } from './_components/RankingTable';
import { getRankingDate } from './_hooks/getRankingDate';

export default function RankingClientPage() {
  const { currentYear, currentMonth, lastMonthYear, lastMonthMonth } =
    getRankingDate();

  const { data: thisMonthRanking } = useSuspenseQuery(
    rankingQueryOptions.adminFeedRanking(currentYear, currentMonth),
  );

  const { data: lastMonthRanking } = useQuery({
    ...rankingQueryOptions.adminFeedRanking(lastMonthYear, lastMonthMonth),
    enabled: true,
  });

  return (
    <Flex className="flex w-full flex-col py-[3.2rem] md:py-[4.8rem]">
      <RankingHeader />
      <Flex className="mt-8 w-full">
        <Tabs defaultIndex={0}>
          <TabItem label="이달의 랭킹">
            <Flex className="mt-[1.6rem]">
              <RankingTable data={thisMonthRanking} />
            </Flex>
          </TabItem>
          <TabItem label="지난달 랭킹">
            <Flex className="mt-[1.6rem]">
              <RankingTable data={lastMonthRanking ?? []} />
            </Flex>
          </TabItem>
        </Tabs>
      </Flex>
    </Flex>
  );
}
