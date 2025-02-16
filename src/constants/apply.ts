import { Applicant } from '@/types/apply';

export const getApplicantInfo = (
  applicant: Pick<
    Applicant,
    'name' | 'studentNumber' | 'department' | 'phoneNumber' | 'email'
  >,
) => [
  { label: '이름', value: applicant.name },
  { label: '학번', value: applicant.studentNumber },
  { label: '학과', value: applicant.department },
  { label: '전화번호', value: applicant.phoneNumber },
  { label: '이메일', value: applicant.email },
];

export const STATUS_TYPE: Record<
  string,
  { text: string; statusText?: string; color: string; backgroundColor: string }
> = {
  SUBMITTED: {
    text: '평가전',
    statusText: '평가전',
    color: 'text-gray-500',
    backgroundColor: 'bg-gray-50',
  },
  FIRST_PASS: {
    text: '합격',
    statusText: '서류 합격',
    color: 'text-green-500',
    backgroundColor: 'bg-green-50',
  },
  FIRST_FAIL: {
    text: '불합격',
    statusText: '서류 불합격',
    color: 'text-red-500',
    backgroundColor: 'bg-red-50',
  },
  FINAL_PASS: {
    text: '합격',
    statusText: '면접 합격',
    color: 'text-green-500',
    backgroundColor: 'bg-green-50',
  },
  FINAL_FAIL: {
    text: '불합격',
    statusText: '면접 불합격',
    color: 'text-red-500',
    backgroundColor: 'bg-red-50',
  },
};

export const EMAIL_STATUS = {
  FIRST_PASS: '서류 합격',
  FIRST_FAIL: '서류 불합격',
  FINAL_PASS: '면접 합격',
  FINAL_FAIL: '면접 불합격',
} as const;

export const EMAIL_OPTIONS = Object.values(EMAIL_STATUS);

export const APPLICANT_PLACEHOLDER = '{지원자명}';
export const TEMPLATE = `안녕하세요. ${APPLICANT_PLACEHOLDER}님.`;
