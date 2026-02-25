'use client';

import { Tabs, TabItem } from 'ddingdong-design-system';

import { RankingHeader } from '../_components/RankingHeader';
import { RankingTable } from '../_components/RankingTable';
import { useMonthlyFeedRanking } from '../_hooks/useGetRanking';

export default function AdminRankingPage() {
  const { thisMonthRanking, lastMonthRanking } = useMonthlyFeedRanking();

  return (
    <div className="flex w-full flex-col py-[3.2rem] md:py-[4.8rem]">
      <RankingHeader />
      <div className="mt-8 w-full">
        <Tabs defaultIndex={0}>
          <TabItem label="이달의 랭킹">
            <div className="mt-[1.6rem]">
              <RankingTable data={thisMonthRanking} />
            </div>
          </TabItem>
          <TabItem label="지난달 랭킹">
            <div className="mt-[1.6rem]">
              <RankingTable data={lastMonthRanking} />
            </div>
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
}
