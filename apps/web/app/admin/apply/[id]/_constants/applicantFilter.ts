export const APPLICANT_FILTER_TYPE = {
  ALL: 'ALL',
  PASS: 'PASS',
  FAIL: 'FAIL',
} as const;

export type ApplicantFilterType =
  (typeof APPLICANT_FILTER_TYPE)[keyof typeof APPLICANT_FILTER_TYPE];

export const APPLICANT_FILTER_OPTIONS = [
  { label: '전체', value: APPLICANT_FILTER_TYPE.ALL },
  { label: '합격', value: APPLICANT_FILTER_TYPE.PASS },
  { label: '불합격', value: APPLICANT_FILTER_TYPE.FAIL },
] as const;
