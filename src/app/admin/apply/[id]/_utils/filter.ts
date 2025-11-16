import { Applicant, ApplicantStatus } from '@/app/_api/types/apply';

export const filterApplicants = (data: Applicant[]) => {
  const interviewApplicants = data.filter((applicant) =>
    ['FIRST_PASS', 'FINAL_FAIL', 'FINAL_PASS'].includes(applicant.status),
  );

  return { documentApplicants: data, interviewApplicants };
};

export const getDocumentStatus = (status: ApplicantStatus) => {
  if (status === 'FIRST_FAIL') return 'FIRST_FAIL';
  if (['FIRST_PASS', 'FINAL_PASS', 'FINAL_FAIL'].includes(status))
    return 'FIRST_PASS';
  return 'SUBMITTED';
};

export const getInterviewStatus = (status: string) => {
  if (status === 'FINAL_PASS') return 'FINAL_PASS';
  if (status === 'FINAL_FAIL') return 'FINAL_FAIL';
  return 'SUBMITTED';
};

export const filterPassedApplicants = (
  data: Applicant[],
  type: 'DOCUMENT' | 'INTERVIEW',
) => {
  return data.filter((applicant) => {
    if (type === 'DOCUMENT') {
      return getDocumentStatus(applicant.status) === 'FIRST_PASS';
    }
    const status = getInterviewStatus(applicant.status);
    return status === 'FINAL_PASS';
  });
};

export const filterFailedApplicants = (
  data: Applicant[],
  type: 'DOCUMENT' | 'INTERVIEW',
) => {
  return data.filter((applicant) => {
    if (type === 'DOCUMENT') {
      return getDocumentStatus(applicant.status) === 'FIRST_FAIL';
    }
    const status = getInterviewStatus(applicant.status);
    return status === 'FINAL_FAIL';
  });
};

export const filterApplicantsByStatus = (
  data: Applicant[],
  type: 'DOCUMENT' | 'INTERVIEW',
  filterType: 'ALL' | 'PASS' | 'FAIL',
) => {
  if (filterType === 'PASS') return filterPassedApplicants(data, type);
  if (filterType === 'FAIL') return filterFailedApplicants(data, type);
  return data;
};

export const getNextStatus = (
  currentStatus: ApplicantStatus,
  hasInterview: boolean,
  isPass: boolean,
): ApplicantStatus => {
  const statusMap: Record<
    ApplicantStatus,
    { pass: ApplicantStatus; fail: ApplicantStatus }
  > = {
    SUBMITTED: {
      pass: 'FIRST_PASS',
      fail: 'FIRST_FAIL',
    },
    FIRST_PASS: {
      pass: hasInterview ? 'FINAL_PASS' : 'FIRST_PASS',
      fail: hasInterview ? 'FINAL_FAIL' : 'FIRST_FAIL',
    },
    FIRST_FAIL: {
      pass: 'FIRST_PASS',
      fail: 'FIRST_FAIL',
    },
    FINAL_PASS: {
      pass: 'FINAL_PASS',
      fail: 'FINAL_FAIL',
    },
    FINAL_FAIL: {
      pass: 'FINAL_PASS',
      fail: 'FINAL_FAIL',
    },
  };

  return statusMap[currentStatus][isPass ? 'pass' : 'fail'];
};

export const getButtonStyle = (
  filterType: string,
  buttonType: 'ALL' | 'PASS' | 'FAIL',
) => {
  return filterType === buttonType ? 'text-blue-500' : 'text-gray-500';
};
