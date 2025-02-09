import { PagingInfo } from './feed';

export type Application = {
  title: string;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  formApplications: Applicant[];
  pagingInfo: PagingInfo;
  token?: string;
};

export type Applicant = {
  id: number;
  formId: number;
  submittedAt: string;
  name: string;
  department: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
  hasInterview: boolean;
  status: ApplicantStatus;
};

export type ApplicantDetail = Applicant & {
  formFieldAnswers: Answer[];
};

export type Answer = {
  fieldId: number;
  question: string;
  type: 'CHECK_BOX' | 'RADIO' | 'TEXT' | 'LONG_TEXT' | 'FILE';
  options: string[] | null;
  required: boolean;
  order: number;
  section: string;
  value: string[];
};

export type UpdateApplicantStatus = {
  formId: number;
  applicationIds: number[];
  status: ApplicantStatus;
  token: string;
};

export type DeleteApplication = {
  formId: number;
  token: string;
};

export type RegisterApplicant = {
  formId: number;
  token: string;
};

export type ApplicantStatus =
  | 'SUBMITTED'
  | 'FIRST_PASS'
  | 'FIRST_FAIL'
  | 'FINAL_PASS'
  | 'FINAL_FAIL';
