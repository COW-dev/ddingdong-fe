'use client';
import { Title1 } from '@dds/shared';

import { ReportFormBundle } from '@/admin/report/[term]/new/_components/ReportFormBundle';

export function ReportNewClientPage({ term }: { term: number }) {
  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 작성
      </Title1>
      <ReportFormBundle term={term} />
    </>
  );
}
