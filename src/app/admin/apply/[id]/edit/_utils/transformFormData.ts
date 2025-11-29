import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';

import { FormAPIResponse, SectionFormField } from '@/app/_api/types/apply';
import { FormBasicInfo } from '@/app/admin/apply/new/_hooks/useFormBasicInfo';

export function transformFormDataToBasicInfo(
  formData: FormAPIResponse,
): FormBasicInfo {
  return {
    title: formData.title,
    description: formData.description || '',
    hasInterview: formData.hasInterview,
    recruitPeriod: {
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    } as DateRangeType,
  };
}

export function transformFormDataToSectionFormField(
  formData: FormAPIResponse,
): SectionFormField[] {
  const sectionMap = new Map<string, FormAPIResponse['formFields']>();

  const formFields = formData.formFields;
  if (formFields && Array.isArray(formFields)) {
    formFields.forEach((field) => {
      if (!sectionMap.has(field.section)) {
        sectionMap.set(field.section, []);
      }
      sectionMap.get(field.section)!.push(field);
    });
  }

  const sections = formData.sections || [];
  return sections.map((section) => ({
    section,
    questions: sectionMap.get(section) || [],
  }));
}
