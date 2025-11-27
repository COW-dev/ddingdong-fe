'use client';

import { Flex } from 'ddingdong-design-system';

import { Question } from '@/app/admin/apply/[id]/statistics/_components/ApplyQuestion';
import { ApplyQuestion } from '@/types/apply';

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
