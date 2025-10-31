'use client';
import { Title1 } from 'ddingdong-design-system';

import ReportEditBundle from '@/app/admin/report/[term]/new/_components/ReportEditBundle';

export function ReportNewClientPage({ term }: { term: number }) {
  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 작성
      </Title1>
      <ReportEditBundle term={term} />
    </>
  );
}
