'use client';

import { Title1 } from 'ddingdong-design-system';
import ReportEdit from '@/app/admin/report/[term]/new/_components/ReportEdit';
import { parseReportResponseToEditReport } from '@/utils/parse';
import { reportQueryOptions } from '@/app/_api/queries/report';
import { useSuspenseQuery } from '@tanstack/react-query';

export function ReportFixClientPage({ term }: { term: number; name: string }) {
  const { data: reportDataList } = useSuspenseQuery(
    reportQueryOptions.termReport(term),
  );

  const reportOne = parseReportResponseToEditReport(reportDataList[0], term);
  const reportTwo = parseReportResponseToEditReport(reportDataList[1], term);

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 수정
      </Title1>
      <ReportEdit report={[reportOne, reportTwo]} term={term} />
    </>
  );
}
