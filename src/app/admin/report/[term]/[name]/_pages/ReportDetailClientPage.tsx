'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Title1, Body3 } from 'ddingdong-design-system';

import { reportQueryOptions } from '@/app/_api/queries/report';
import { BackHeader } from '../../../_components/BackHeader';
import ReportBundle from '../_components/ReportBundle';
import { EditButton } from '../_components/EditButton';

export function ReportDetailClientPage({
  term,
  name,
}: {
  term: number;
  name: string;
}) {
  const { data: reports } = useSuspenseQuery(
    reportQueryOptions.termReport(term),
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
      <ReportBundle reports={reports} />
      <EditButton term={term} />
    </>
  );
}
