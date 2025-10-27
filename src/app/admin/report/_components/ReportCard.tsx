'use client';
import { useSuspenseQueries } from '@tanstack/react-query';
import { Badge } from 'ddingdong-design-system';

import { clubQueryOptions } from '@/app/_api/queries/club';
import { reportQueryOptions } from '@/app/_api/queries/report';
import { Term } from '@/app/_api/types/report';
import { useTerm } from '../_hooks/useTerm';
import { ReportTermCard } from './Card';

export function ReportCard({ termInfo }: { termInfo: Term }) {
  const [{ data: myReports }, { data: myClubData }] = useSuspenseQueries({
    queries: [reportQueryOptions.myReports(), clubQueryOptions.my()],
  });

  const { term } = termInfo;

  const isSubmitted = myReports.map((report) => Number(report.term));
  const { isClosed, isFuture } = useTerm(term);

  if (isSubmitted.includes(term)) {
    return (
      <ReportTermCard
        termInfo={termInfo}
        badge={<Badge text="제출완료" variant="positive" />}
        href={`/report/${term}/${myClubData.name}`}
      />
    );
  }
  if (isClosed) {
    return (
      <ReportTermCard
        termInfo={termInfo}
        badge={<Badge text="미제출" variant="negative" />}
        disabled
      />
    );
  }
  return (
    <ReportTermCard
      termInfo={termInfo}
      badge={<Badge text="제출하기" variant="neutral" />}
      href={`/report/${term}/new`}
      disabled={isFuture}
    />
  );
}
