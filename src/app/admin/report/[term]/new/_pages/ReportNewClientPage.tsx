'use client';

import { Title1 } from 'ddingdong-design-system';

import ReportEdit from '@/app/admin/report/[term]/new/_components/ReportEdit';

export function ReportNewClientPage({ term }: { term: string }) {
  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 작성
      </Title1>
      <ReportEdit term={Number(term)} />
    </>
  );
}
