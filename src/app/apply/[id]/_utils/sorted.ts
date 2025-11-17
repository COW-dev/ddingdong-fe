import { FormField } from '@/app/_api/types/apply';

export const sortedFields = (formFields: FormField[]) => {
  const common: FormField[] = [];
  const regular: FormField[] = [];

  formFields.forEach((field) => {
    if (field.section === '공통') {
      common.push(field);
    } else {
      regular.push(field);
    }
  });

  common.sort((a, b) => (a.order || 0) - (b.order || 0));
  regular.sort((a, b) => (a.order || 0) - (b.order || 0));

  return [...common, ...regular];
};
