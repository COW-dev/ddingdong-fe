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
    <Flex dir="col" gap={2}>
      <Title1 as="h1" weight="bold" className="py-7 md:py-10">
        지원서 통계 확인하기
      </Title1>
      <Title3>
        총 지원자
        <Title3 as="span" className="ml-2 text-blue-500">
          {statisticsData.totalCount}
        </Title3>
        명
      </Title3>
      <Summary applyId={id} />
      <QuestionList applyId={id} />
    </Flex>
  );
}
