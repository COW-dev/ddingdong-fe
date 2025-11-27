'use client';

import { useRouter } from 'next/navigation';

import { Button, Flex } from 'ddingdong-design-system';

import { FormField } from '@/app/_api/types/apply';

import { useApplyForm } from '../_hooks/useApplyForm';
import { sortedFields } from '../_utils/sorted';

import { CommonQuestion } from './CommonQuestion';
import { QuestionCard } from './QuestionCard';

type ApplyFormProps = {
  formId: number;
  formFields: FormField[];
};

export function ApplyForm({ formId, formFields }: ApplyFormProps) {
  const router = useRouter();
  const {
    isPending,
    handleCommonQuestionChange,
    handleSubmit,
    updateFormAnswer,
  } = useApplyForm(formId, formFields);

  const fields = sortedFields(formFields);

  return (
    <Flex dir="col" gap={2} className="w-full">
      <CommonQuestion onChange={handleCommonQuestionChange} />
      {fields.map((field) => (
        <QuestionCard
          key={field.id}
          {...field}
          onChange={(value) => updateFormAnswer(Number(field.id), value)}
        />
      ))}
      <Flex dir="row" gap={3} className="w-full justify-center p-6">
        <Button
          variant="tertiary"
          onClick={() => router.back()}
          disabled={isPending}
        >
          취소
        </Button>
        <Button
          variant="primary"
          color="blue"
          size="lg"
          onClick={handleSubmit}
          disabled={isPending}
          isLoading={isPending}
        >
          제출하기
        </Button>
      </Flex>
    </Flex>
  );
}
