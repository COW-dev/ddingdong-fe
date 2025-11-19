import { useSuspenseQueries } from '@tanstack/react-query';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import { clubQueryOptions } from '@/app/_api/queries/club';

import { createComparisonData } from '../_utils/createComparison';

export const useSummary = (id: number) => {
  const [{ data: statisticsData }, { data: myData }] = useSuspenseQueries({
    queries: [applyQueryOptions.statistics(id), clubQueryOptions.my()],
  });

  const sortDepartmentByLabel = statisticsData.departmentStatistics
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  const isFirstApply = statisticsData.applicantStatistics.length === 1;

  const getApplicantStatistics = () => {
    if (!isFirstApply) return statisticsData.applicantStatistics;
    const clubName = myData.name.toUpperCase();
    return createComparisonData(clubName, statisticsData.applicantStatistics);
  };

  return {
    isFirstApply,
    departmentRanks: sortDepartmentByLabel,
    applicantStatistics: getApplicantStatistics(),
  };
};
