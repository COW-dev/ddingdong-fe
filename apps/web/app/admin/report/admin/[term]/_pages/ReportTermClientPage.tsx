'use client';

import { Title1 } from '@dds/shared';
import { useSuspenseQueries } from '@tanstack/react-query';

import { clubQueryOptions } from '@/_api/queries/club';
import { reportQueryOptions } from '@/_api/queries/report';

import { BackHeader } from '../../../_components/BackHeader';
import { ReportCardContainer } from '../../../_containers/ReportCardContainer';
import { FilterOption } from '../_components/FilterOption';
import { ReportCard } from '../_components/ReportCard';
import { useReportFilter } from '../_hooks/useReportFilter';

export function ReportTermClientPage({ term }: { term: number }) {
  const [{ data: clubs }, { data: termReports }] = useSuspenseQueries({
    queries: [clubQueryOptions.all(), reportQueryOptions.termReports(term)],
  });

  const { submittedClubNames, filterOptions, filteredClubs, setFilteredClubs } =
    useReportFilter(clubs, termReports);

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 관리
      </Title1>
      <BackHeader title={`${term}회차`} />
      <FilterOption
        filterOption={filterOptions}
        setFilteredClub={setFilteredClubs}
      />
      <ReportCardContainer>
        {filteredClubs.map((club) => (
          <ReportCard
            key={club.id}
            term={term}
            club={club}
            isSubmitted={submittedClubNames.has(club.name)}
          />
        ))}
      </ReportCardContainer>
    </>
  );
}
