'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Title1 } from 'ddingdong-design-system';

import { reportQueryOptions } from '@/app/_api/queries/report';
import ReportEditBundle from '../../../new/_components/ReportEditBundle';
import { parseReportResponseToEditReport } from '../_utils/parseReport';

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
      <ReportEditBundle report={[reportOne, reportTwo]} term={term} />
    </>
  );
}
