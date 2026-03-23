'use client';

import { Flex } from '@dds/shared';

import { ApplyQuestion } from '@/_api/types/apply';
import { Question } from '@/admin/apply/[id]/statistics/_components/ApplyQuestion';

import { useSection } from '../_hooks/useSection';

import { Sections } from './Sections';

export function QuestionList({ applyId }: { applyId: number }) {
  const { sections, focusSection, setFocusSection, filteredQuestions } =
    useSection(applyId);
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
