export interface CreateFormData {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  sections: string[];
  formFields: FormField[];
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

export type FormState = {
  title: string;
  description: string;
  hasInterview: boolean;
  sections: string[];
  startDate: string | null;
  endDate: string | null;
  formFields: FormField[];
};

export type QuestionType =
  | 'CHECK_BOX'
  | 'RADIO'
  | 'LONG_TEXT'
  | 'TEXT'
  | 'FILE';

export type FormField = {
  id?: string | number;
  question: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  order: number;
  section: string;
  clientId?: string;
};

export type ModeType = 'view' | 'edit';

export type UpdateFormDeadlineParams = {
  token: string;
  formId: number;
  endDate: string;
};
