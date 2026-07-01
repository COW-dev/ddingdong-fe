import {
  CreateFormDataAPIRequest,
  FormField,
  QuestionType,
  SectionFormField,
} from '@/_api/types/apply';

import { FormBasicInfo } from '../_hooks/useFormBasicInfo';

export function parseLocalDate(date: string): Date {
  const [yearText, monthText, dayText] = date.split('-');

  if (!yearText || !monthText || !dayText) {
    return new Date(date);
  }
  console.log(date);

  return new Date(Number(yearText), Number(monthText) - 1, Number(dayText));
}

export function formatDate(date: Date | string | null): string {
  if (!date) return '';

  const localDate = date instanceof Date ? date : parseLocalDate(date);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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
