'use client';

import { useRouter } from 'next/navigation';

import {
  Title3,
  IconButton,
  Flex,
  Title1,
  Body3,
} from 'ddingdong-design-system';

import ReportItem from '@/components/report/ReportItem';
import { BackHeader } from '@/app/admin/report/_components/BackHeader';
import { reportQueryOptions } from '@/app/_api/queries/report';
import { TermReport } from '@/types/report';
import { useSuspenseQuery } from '@tanstack/react-query';

export function ReportDetailClientPage({
  term,
  name,
}: {
  term: number;
  name: string;
}) {
  const { data: termreports } = useSuspenseQuery(
    reportQueryOptions.termReports(term),
  );
  function getClubIdByName(reports: TermReport[], name: string) {
    const club = reports.find((item) => item.club.name === name);
    return club ? club.club.id : 0;
  }

  const clubId = getClubIdByName(termreports ?? [], name);
  const { data: reports } = useSuspenseQuery(
    reportQueryOptions.report(term, clubId),
  );

  return (
    <>
      <Flex
        justifyContent="between"
        className="items-end pt-7 md:items-start md:pt-10"
      >
        <div>
          <Title1 weight="bold" className="pb-7 md:pb-10">
            활동보고서 관리
          </Title1>
          <BackHeader title={`${term}회차 / ${name}`} />
        </div>
        <Body3 weight="normal">제출일시 {reports[0]?.createdAt}</Body3>
      </Flex>
      <ReportItem reports={reports} />
    </>
  );
}
