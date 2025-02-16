type Section = string;

export type QuestionType =
  | 'CHECK_BOX'
  | 'RADIO'
  | 'TEXT'
  | 'LONG_TEXT'
  | 'FILE';

export interface FormField {
  question: string;
  type: QuestionType;
  options: string[] | [];
  required: boolean;
  order: number;
  section: Section;
}

export interface FormData {
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

export interface Answer {
  fieldId: number;
  value: string | string[];
}

export interface ApplyData {
  name: string;
  studentNumber: number;
  department: string;
  email: string;
  phoneNumber: string;
  formAnswers: Answer[];
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
  addSection: () => void;
  focusSection: string;
  sections: string[];
  setFocusSection: (section: string) => void;
  isClosed: boolean;
  formField: {
    section: string;
    questions: FormField[];
  }[];
  setFormField: (
    fields: {
      section: string;
      questions: FormField[];
    }[],
  ) => void;
  setSections: (sections: string[]) => void;
  baseQuestion: FormField[];
}
