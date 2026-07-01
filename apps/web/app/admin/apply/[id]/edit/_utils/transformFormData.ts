import { FormAPIResponse, SectionFormField } from '@/_api/types/apply';
import { FormBasicInfo } from '@/admin/apply/new/_hooks/useFormBasicInfo';
import { parseLocalDate } from '@/admin/apply/new/_utils/format';

export function transformFormDataToBasicInfo(
  formData: FormAPIResponse,
): FormBasicInfo {
  return {
    title: formData.title,
    description: formData.description || '',
    hasInterview: formData.hasInterview,
    recruitPeriod: {
      startDate: parseLocalDate(formData.startDate),
      endDate: parseLocalDate(formData.endDate),
    },
  };
}

export function transformFormDataToSectionFormField(
  formData: FormAPIResponse,
): SectionFormField[] {
  const sectionMap = new Map<string, FormAPIResponse['formFields']>();

  const formFields = formData.formFields;
  if (formFields && Array.isArray(formFields)) {
    formFields.forEach((field) => {
      const sectionFields = sectionMap.get(field.section);

      if (sectionFields) {
        sectionFields.push(field);
        return;
      }

      sectionMap.set(field.section, [field]);
    });
  }

  const sections = formData.sections || [];
  return sections.map((section) => ({
    section,
    questions: sectionMap.get(section) || [],
  }));
}
