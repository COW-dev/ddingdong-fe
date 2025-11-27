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

export type ChartItem = {
  label: string;
  count: number;
  ratio: number;
  rank?: number;
};

export type SingleField = {
  type: QuestionType;
  answers: { applicationId: number; name: string; answer: string }[];
};

export type MultipleField = {
  type: QuestionType;
  options: { count: number; label: string; ratio: number }[];
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
  id?: number;
  question: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  order: number;
  section: string;
};

export type FormFieldAPIResponse = {
  clubName: string;
  title: string;
  description?: string | null;
  applicationCount: number;
  startDate: string;
  endDate: string;
  formFields: FormField[];
};

export type SectionFormField = {
  section: string;
  questions: FormField[];
};

export type SectionAPIResponse = {
  title: string;
  description?: string | null;
  startDate: string;
  endDate: string;
  sections: string[];
};

export type SubmitApplicationAPIRequest = {
  formId: number;
  formData: ApplyData;
};

export type ApplyData = {
  name: string;
  studentNumber: string;
  department: string;
  email: string;
  phoneNumber: string;
  formAnswers: FormAnswer[];
};

export type FormAnswer = {
  fieldId: number;
  value: string | string[];
};

export type ApplyStatistics = {
  totalCount: number;
  departmentStatistics: ChartItem[];
  applicantStatistics: ApplyRate[];
  fieldStatistics: FieldStatistics;
};

export type FieldStatistics = {
  fields: ApplyQuestion[];
  sections: string[];
};

export type ApplyQuestion = {
  question: string;
  id: number;
  count: number;
  section: string;
  type: QuestionType;
};

export type AnswerItem = {
  applicationId: number;
  name: string;
  answer: string;
  fileName?: string;
};

export type ApplyRate = {
  label: string;
  count: number;
  comparedToBefore: {
    ratio: number;
    value: number;
  };
};

export type FileItem = {
  applicationId: number;
  name: string;
  answer: string[];
};
