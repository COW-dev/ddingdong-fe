import { useRef } from 'react';

import {
  FormField,
  QuestionType,
  SectionFormField,
} from '@/app/_api/types/apply';

import { useFormFieldContext } from '../_contexts/FormFieldContext';

const DEBOUNCE_DELAY_MS = 300;

export function useQuestionHandlers(index: number, section: SectionFormField) {
  const { updateQuestion } = useFormFieldContext();
  const questionInputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateField = <K extends keyof FormField>(
    field: K,
    value: FormField[K],
  ) => {
    updateQuestion(section.section, index, field, value);
  };

  const syncQuestionValue = () => {
    if (questionInputRef.current) {
      const newValue = questionInputRef.current.value;
      updateField('question', newValue);
    }
  };

  const handleInputChange = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      syncQuestionValue();
      debounceTimerRef.current = null;
    }, DEBOUNCE_DELAY_MS);
  };

  const handleInputBlur = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    syncQuestionValue();
  };

  const resetInputValue = () => {
    if (questionInputRef.current) {
      questionInputRef.current.value = '';
      updateField('question', '');
    }
  };

  const handleTypeChange = (value: QuestionType) => {
    updateField('type', value);
    updateField(
      'options',
      ['RADIO', 'CHECK_BOX'].includes(value) ? ['옵션1'] : [],
    );
  };

  const handleSwitchChange = (value: boolean) => {
    updateField('required', value);
  };

  return {
    questionInputRef,
    resetInputValue,
    handleInputChange,
    handleInputBlur,
    handleTypeChange,
    handleSwitchChange,
  };
}
