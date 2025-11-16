import { useCallback } from 'react';

import { Flex } from 'ddingdong-design-system';

import { FormField, SectionFormField } from '@/app/_api/types/apply';
import { Question } from '@/app/admin/apply/new/_components/question/Question';
import { useFormFieldContext } from '@/app/admin/apply/new/_contexts/FormFieldContext';

import { useQuestionDrag } from '../../_hooks/dragAnddrop/useQuestionDrag';
import { CommonQuestionPreview } from '../CommonQuestionPreview';

type QuestionListProps = {
  focusSection: string;
  sectionData: SectionFormField | undefined;
  deleteQuestion: (section: string, questionIndex: number) => void;
  readOnly?: boolean;
};

function QuestionListComponent({
  focusSection,
  sectionData,
  deleteQuestion,
  readOnly = false,
}: QuestionListProps) {
  const { reorderQuestions } = useFormFieldContext();
  const questionCount = sectionData?.questions.length ?? 0;

  const {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleContainerDragOver,
  } = useQuestionDrag({
    onReorder: (fromIndex, toIndex) => {
      reorderQuestions(focusSection, fromIndex, toIndex);
    },
  });

  const handleDeleteQuestion = useCallback(
    (qIndex: number) => {
      deleteQuestion(focusSection, qIndex);
    },
    [deleteQuestion, focusSection],
  );
  return (
    <Flex
      dir="col"
      gap={4}
      onDragOver={readOnly ? undefined : handleContainerDragOver}
    >
      {focusSection === '공통' && <CommonQuestionPreview />}
      {sectionData?.questions.map((question: FormField, index: number) => (
        <Question
          key={question.id || `${focusSection}-${index}`}
          index={index}
          questionData={question}
          deleteQuestion={() => handleDeleteQuestion(index)}
          section={sectionData}
          canDelete={questionCount > 1 && !readOnly}
          onDragStart={readOnly ? undefined : handleDragStart}
          onDragOver={readOnly ? undefined : handleDragOver}
          onDrop={readOnly ? undefined : handleDrop}
          onDragEnd={readOnly ? undefined : handleDragEnd}
          isDragging={draggedIndex === index}
          dragOverIndex={dragOverIndex}
          readOnly={readOnly}
        />
      ))}
    </Flex>
  );
}

export const QuestionList = QuestionListComponent;
