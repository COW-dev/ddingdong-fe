'use client';

import { createContext, useContext } from 'react';

import { FormField, SectionFormField } from '@/app/_api/types/apply';

type FormFieldContextType = {
  focusSection: string;
  sections: string[];
  formField: SectionFormField[];
  changeFocusSection: (section: string) => void;
  addSection: (section: string) => void;
  deleteSection: (section: string) => void;
  updateSection: (oldName: string, newName: string) => void;
  addQuestion: (section: string) => void;
  deleteQuestion: (section: string, questionIndex: number) => void;
  reorderQuestions: (
    section: string,
    fromIndex: number,
    toIndex: number,
  ) => void;
  updateQuestion: (
    section: string,
    questionIndex: number,
    field: keyof FormField,
    value: FormField[keyof FormField],
  ) => void;
};

export const FormFieldContext = createContext<FormFieldContextType | null>(
  null,
);

export function useFormFieldContext() {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error(
      'useFormFieldContext must be used within FormFieldProvider',
    );
  }
  return context;
}
