import {
  CreateFormDataAPIRequest,
  FormField,
  SectionFormField,
} from '@/app/_api/types/apply';

export interface CategorizedFields {
  [key: string]: FormField[];
}

export function categorizeFormFields(
  formData: CreateFormDataAPIRequest | undefined,
): CategorizedFields {
  const categorizedFields: CategorizedFields = {};

  (formData?.sections || []).forEach((section) => {
    categorizedFields[section] = [];
  });

  (formData?.formFields || []).forEach((field) => {
    if (field.section in categorizedFields) {
      categorizedFields[field.section].push(field);
    }
  });

  return categorizedFields;
}

export function convertCategorizedFieldsToSectionFormFields(
  categorizedFields: CategorizedFields,
): SectionFormField[] {
  return Object.keys(categorizedFields).map((section) => ({
    section,
    questions: categorizedFields[section].map((field) => ({
      question: field.question,
      type: field.type,
      options: field.options || [],
      required: field.required,
      order: field.order,
      section: field.section,
    })),
  }));
}
