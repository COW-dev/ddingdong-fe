'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Title1, Body3 } from 'ddingdong-design-system';

import { reportQueryOptions } from '@/app/_api/queries/report';
import ReportBundle from '@/app/admin/report/[term]/[name]/_components/ReportBundle';
import { BackHeader } from '@/app/admin/report/_components/BackHeader';
import { TermReport } from '@/types/report';

export function getClubId(reports: TermReport[], name: string) {
  const club = reports.find((item) => item.club.name === name);
  return club?.club.id ?? 0;
}

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

  const clubId = getClubId(termreports ?? [], name);
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
        <Body3 weight="normal">
          <Body3
            as="span"
            weight="normal"
            className="text-right max-sm:block md:mr-1"
          >
            제출일시
          </Body3>
          {reports[0]?.createdAt}
        </Body3>
      </Flex>
      <ReportBundle reports={reports} />
    </>
  );
}
