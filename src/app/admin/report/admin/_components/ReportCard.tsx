'use client';
import { Term } from '@/app/_api/types/report';
import { useTerm } from '../../_hooks/useTerm';
import { Badge } from 'ddingdong-design-system';
import { ReportTermCard } from '../../_components/Card';

export function ReportCard({ termInfo }: { termInfo: Term }) {
  const { term } = termInfo;
  const { isClosed, isFuture } = useTerm(term);

  if (isClosed) {
    return (
      <ReportTermCard
        termInfo={termInfo}
        href={`/report/admin/${term}`}
        badge={<Badge variant="negative" text="진행 종료" />}
      />
    );
  }
  if (isFuture) {
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
