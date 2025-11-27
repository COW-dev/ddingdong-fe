import { useRef, useCallback } from 'react';

import { toast } from 'react-hot-toast';

import { useSubmitApplication } from '@/app/_api/mutations/apply';
import { FormAnswer, FormField } from '@/app/_api/types/apply';

import { useApplyFunnel } from '../_contexts/ApplyFunnelContext';
import { validateApplyData } from '../_utils/validateApplyData';

type CommonQuestionData = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
};

export function useApplyForm(formId: number, formFields: FormField[]) {
  const { mutate: submitApplication, isPending } = useSubmitApplication();
  const { setStep } = useApplyFunnel();

  const commonQuestionDataRef = useRef<CommonQuestionData>({
    name: '',
    studentNumber: '',
    department: '',
    phoneNumber: '',
    email: '',
  });

  const formAnswersRef = useRef<FormAnswer[]>([]);

  const handleCommonQuestionChange = useCallback(
    (updates: CommonQuestionData) => {
      commonQuestionDataRef.current = updates;
    },
    [],
  );

  const handleSubmit = () => {
    const commonQuestionData = commonQuestionDataRef.current;
    const formAnswers = formAnswersRef.current;

    const isValid = validateApplyData({
      commonQuestionData,
      formAnswers,
      formFields,
    });

    if (!isValid) {
      return;
    }

    const formAnswersWithArrayValues = formAnswers.map((answer) => {
      if (Array.isArray(answer.value)) {
        return answer;
      }
      return {
        ...answer,
        value: answer.value ? [answer.value] : [],
      };
    });

    submitApplication(
      {
        formId,
        formData: {
          ...commonQuestionData,
          formAnswers: formAnswersWithArrayValues,
        },
      },
      {
        onSuccess: () => {
          toast.success('지원서 제출이 완료되었어요.');
          setStep('SUBMITTED');
        },
      },
    );
  };

  const updateFormAnswer = useCallback(
    (fieldId: number, value: string | string[]) => {
      const existingIndex = formAnswersRef.current.findIndex(
        (ans) => ans.fieldId === fieldId,
      );
      if (existingIndex !== -1) {
        formAnswersRef.current[existingIndex] = { fieldId, value };
      } else {
        formAnswersRef.current.push({ fieldId, value });
      }
    },
    [],
  );

  return {
    isPending,
    handleCommonQuestionChange,
    handleSubmit,
    updateFormAnswer,
  };
}
