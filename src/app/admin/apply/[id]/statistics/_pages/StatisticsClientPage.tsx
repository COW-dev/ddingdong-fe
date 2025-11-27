'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Title1, Title3 } from 'ddingdong-design-system';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import { QuestionList } from '@/app/admin/apply/[id]/statistics/_components/QuestionList';
import { Summary } from '@/app/admin/apply/[id]/statistics/_components/Summary';

export default function StatisticsClientPage({ id }: { id: number }) {
  const { data: statisticsData } = useSuspenseQuery(
    applyQueryOptions.statistics(id),
  );

  return (
    <Flex dir="col" className="gap-7 md:gap-10">
      <Title1 as="h1" weight="bold" className="mt-7 md:mt-10">
        지원서 통계 확인하기
      </Title1>
      <div>
        <Title3>
          총 지원자
          <Title3 as="span" className="ml-2 text-blue-500">
            {statisticsData.totalCount}
          </Title3>
          명
        </Title3>
        <Summary applyId={id} />
      </div>
      <QuestionList applyId={id} />
    </Flex>
  );
}
