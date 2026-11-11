'use client';
import { Badge } from '@dds/shared';

import { Term } from '@/_api/types/report';

import { ReportTermCard } from '../../_components/Card';

export function ReportCard({ termInfo }: { termInfo: Term }) {
  const { term, status } = termInfo;

  if (status === 'CLOSED') {
    return (
      <ReportTermCard
        termInfo={termInfo}
        href={`/report/admin/${term}`}
        badge={<Badge variant="negative" text="진행 종료" />}
      />
    );
  }
  if (status === 'UPCOMING') {
    return (
      <ReportTermCard
        termInfo={termInfo}
        disabled
        badge={<Badge variant="neutral" text="진행 전" />}
      />
    );
  }
  return (
    <ReportTermCard
      termInfo={termInfo}
      href={`/report/admin/${term}`}
      badge={<Badge variant="positive" text="진행 중" />}
    />
  );
}
