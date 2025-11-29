import { useMemo, useState } from 'react';

import { Applicant } from '@/app/_api/types/apply';

import {
  APPLICANT_FILTER_TYPE,
  ApplicantFilterType,
} from '../_constants/applicantFilter';
import {
  filterApplicantsByStatus,
  filterFailedApplicants,
  filterPassedApplicants,
} from '../_utils/filter';

type ApplicantType = 'DOCUMENT' | 'INTERVIEW';

export const useApplicantFilter = (data: Applicant[], type: ApplicantType) => {
  const [keyword, setKeyword] = useState<string>('');
  const [filterType, setFilterType] = useState<ApplicantFilterType>(
    APPLICANT_FILTER_TYPE.ALL,
  );
  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const passedApplicants = useMemo(
    () => filterPassedApplicants(data, type),
    [data, type],
  );

  const failedApplicants = useMemo(
    () => filterFailedApplicants(data, type),
    [data, type],
  );

  const filteredApplicants = useMemo(() => {
    const keywordFiltered = data.filter((applicant) =>
      applicant.name.includes(keyword),
    );
    const statusFiltered = filterApplicantsByStatus(
      keywordFiltered,
      type,
      filterType,
    );
    return statusFiltered;
  }, [data, type, filterType, keyword]);

  const filterCounts = useMemo(
    () => ({
      [APPLICANT_FILTER_TYPE.ALL]: data.length,
      [APPLICANT_FILTER_TYPE.PASS]: passedApplicants.length,
      [APPLICANT_FILTER_TYPE.FAIL]: failedApplicants.length,
    }),
    [data.length, passedApplicants.length, failedApplicants.length],
  );

  return {
    filterType,
    setFilterType,
    keyword,
    handleSearch,
    filteredApplicants,
    filterCounts,
    passedApplicants,
    failedApplicants,
  };
};
