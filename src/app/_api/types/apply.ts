export type AllFormAPIResponse = Form[];
export type QuestionType =
  | 'CHECK_BOX'
  | 'RADIO'
  | 'LONG_TEXT'
  | 'TEXT'
  | 'FILE';
export type FormStatus = '진행 전' | '진행 중' | '마감';
export type ApplicantStatus =
  | 'SUBMITTED'
  | 'FIRST_PASS'
  | 'FIRST_FAIL'
  | 'FINAL_PASS'
  | 'FINAL_FAIL';

export type Form = {
  formId: number;
  title: string;
  startDate: string;
  endDate: string;
  formStatus: FormStatus;
};

export type UpdateApplicantStatusAPIRequest = {
  formId: number;
  applicationIds: number[];
  status: ApplicantStatus;
};

export type UpdateApplicantNoteAPIRequest = {
  formId: number;
  applicationId: number;
  note: string;
};

export type ApplicationAPIResponse = {
  title: string;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  formStatus: FormStatus;
  formApplications: Applicant[];
};

export type Applicant = {
  id: number;
  formId: number;
  submittedAt: string;
  name: string;
  studentNumber: string;
  status: ApplicantStatus;
};

export type ApplicantDetailAPIResponse = {
  hasInterview: boolean;
  submittedAt: string;
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
  status: ApplicantStatus;
  note: string;
  formFieldAnswers: Answer[];
};

export type Answer = {
  fieldId: number;
  question: string;
  type: QuestionType;
  options: string[] | null;
  required: boolean;
  order: number;
  section: string;
  value: string[];
  files: {
    name: string;
    cdnUrl: string;
  }[];
};

export type CreateResultEmailAPIRequest = {
  formId: number;
  title: string;
  target: ApplicantStatus;
  message: string;
};

export type FormAPIResponse = {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  sections: string[];
  formFields: FormField[];
};

export type CreateFormDataAPIRequest = {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  sections: string[];
  formFields: FormField[];
};

export type UpdateFormAPIRequest = {
  formId: number;
  formData: CreateFormDataAPIRequest;
};

export type FormField = {
  id?: string;
  question: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  order: number;
  section: string;
};

export type SectionFormField = {
  section: string;
  questions: FormField[];
};
