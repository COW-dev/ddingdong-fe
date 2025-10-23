import { useMemo, useState } from 'react';
import { Club } from '@/app/_api/types/club';
import { TermReport } from '@/app/_api/types/report';

export const useReportFilter = (clubs: Club[], termReports: TermReport[]) => {
  const submittedClubNames = useMemo(
    () => new Set(termReports.map(({ club }) => club.name)),
    [termReports],
  );
  const sortedClubs = useMemo(
    () => [...clubs].sort((a, b) => a.category.localeCompare(b.category)),
    [clubs],
  );

  const filterOptions = useMemo(() => {
    const submit: Club[] = [];
    const unSubmit: Club[] = [];

    sortedClubs.forEach((club) => {
      (submittedClubNames.has(club.name) ? submit : unSubmit).push(club);
    });

    return {
      all: sortedClubs,
      submit,
      unSubmit,
    };
  }, [sortedClubs, submittedClubNames]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>(filterOptions.all);

  return {
    submittedClubNames,
    filterOptions,
    filteredClubs,
    setFilteredClubs,
  };
};
