import {
  FormField,
  QuestionType,
  SectionFormField,
} from '@/app/_api/types/apply';

import { useFormFieldContext } from '../_contexts/FormFieldContext';

export function useQuestionHandlers(index: number, section: SectionFormField) {
  const { updateQuestion } = useFormFieldContext();

  const updateField = (
    field: keyof FormField,
    value: FormField[keyof FormField],
  ) => {
    updateQuestion(section.section, index, field, value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateField('question', e.target.value);
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
    handleInputChange,
    handleTypeChange,
    handleSwitchChange,
  };
}
