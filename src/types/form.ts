import { Dispatch, SetStateAction } from 'react';

type Section = string;

export interface CreateFormData {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  sections: Section[];
  formFields: FormField[];
}

export interface ManageFormProps {
  formData?: FormData;
}

export interface FormAnswer {
  fieldId: string | number;
  value: string | string[];
}

export interface QuestionField {
  question: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  order: number;
  section: string;
}

export type QuestionType =
  | 'CHECK_BOX'
  | 'RADIO'
  | 'LONG_TEXT'
  | 'TEXT'
  | 'FILE';

export interface FormField {
  question: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  order: number;
  section: string;
}

export interface SectionFormField {
  section: string;
  questions: FormField[];
}

export interface FormData {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  sections: string[];
  formFields: FormField[];
}

export interface ApplyData {
  name: string;
  studentNumber: string;
  department: string;
  email: string;
  phoneNumber: string;
  formAnswers: {
    fieldId: string | number;
    value: string | string[];
  }[];
}

export interface FormBlockData {
  formId: number;
  title: string;
  startDate: string;
  endDate: string;
  formStatus: '진행 전' | '진행 중' | '마감';
  onClick: () => void;
}

export interface SectionsProps {
  focusSection: string;
  setFocusSection: Dispatch<SetStateAction<string>>;
  sections: string[];
  setSections: Dispatch<SetStateAction<string[]>>;
  formField: SectionFormField[];
  setFormField: Dispatch<SetStateAction<SectionFormField[]>>;
  isClosed: boolean;
  baseQuestion: Omit<FormField, 'section'>[];
  addSection: () => void;
}
