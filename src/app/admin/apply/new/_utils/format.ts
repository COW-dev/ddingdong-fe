import {
  CreateFormDataAPIRequest,
  FormField,
  QuestionType,
  SectionFormField,
} from '@/app/_api/types/apply';

import { FormBasicInfo } from '../_hooks/useFormBasicInfo';

export function formatDate(date: Date | string | null): string {
  if (!date) return '';
  if (date instanceof Date) return date.toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

export function formatFormData(
  basicInfo: FormBasicInfo,
  sections: string[],
  formField: SectionFormField[],
): CreateFormDataAPIRequest {
  return {
    title: basicInfo.title.trim(),
    description: basicInfo.description.trim() || null,
    startDate: formatDate(basicInfo.recruitPeriod.startDate),
    endDate: formatDate(basicInfo.recruitPeriod.endDate),
    hasInterview: basicInfo.hasInterview,
    sections: sections,
    formFields: formField.flatMap((section) =>
      section.questions.map(
        (question): FormField => ({
          question: question.question.trim(),
          type: question.type as QuestionType,
          options: question.options || [],
          required: question.required,
          order: question.order,
          section: section.section,
        }),
      ),
    ),
  };
}
