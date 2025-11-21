import { FormField } from '@/app/_api/types/apply';
const COMMON_SECTION = '공통' as const;
export const sortedFields = (formFields: FormField[]) => {
  const sortByOrder = (fields: FormField[]) =>
    [...fields].sort((a, b) => (a.order || 0) - (b.order || 0));

  const common = sortByOrder(
    formFields.filter((field) => field.section === COMMON_SECTION),
  );
  const regular = sortByOrder(
    formFields.filter((field) => field.section !== COMMON_SECTION),
  );

  return [...common, ...regular];
};
