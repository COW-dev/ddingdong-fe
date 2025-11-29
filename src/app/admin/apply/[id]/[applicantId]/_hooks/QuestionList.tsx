'use client';
import { useMemo, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex } from 'ddingdong-design-system';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import { ApplyQuestion } from '@/app/_api/types/apply';
import { Question } from '@/app/admin/apply/[id]/statistics/_components/ApplyQuestion';
import { Sections } from '@/app/admin/apply/[id]/statistics/_components/Sections';

export function QuestionList({ applyId }: { applyId: number }) {
  const { data: statisticsData } = useSuspenseQuery(
    applyQueryOptions.statistics(applyId),
  );
  const sections = statisticsData.fieldStatistics.sections;
  const [focusSection, setFocusSection] = useState(sections[0]);

  const filteredQuestions = useMemo(() => {
    return statisticsData.fieldStatistics.fields.filter(
      (item: ApplyQuestion) => item.section === focusSection,
    );
  }, [statisticsData, focusSection]);

  return (
    <div>
      <Sections
        focusSection={focusSection}
        setFocusSection={setFocusSection}
        sections={sections}
      />
      <Flex dir="col" gap={2}>
        {filteredQuestions?.map((question: ApplyQuestion) => {
          return <Question data={question} key={question.id} />;
        })}
      </Flex>
    </div>
  );
}
