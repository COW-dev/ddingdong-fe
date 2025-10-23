'use client';

import Link from 'next/link';

import { useSuspenseQueries } from '@tanstack/react-query';
import {
  Accordion,
  AccordionItem,
  DoubleButton,
  Button,
  Body2,
  usePortal,
  Flex,
  Title1,
  Body3,
  Title3,
} from 'ddingdong-design-system';

import { useDeleteReport } from '@/app/_api/mutations/report';
import { clubQueryOptions } from '@/app/_api/queries/club';
import { reportQueryOptions } from '@/app/_api/queries/report';
import Report from '@/app/admin/report/[term]/[name]/_components/Report';
import { DeleteModal } from '../_components/DeleteModal';
import { BackHeader } from '../../../_components/BackHeader';
import ReportItem from '@/components/report/ReportItem';
import { EditButton } from '../_components/EditButton';

export function ReportDetailClientPage({
  term,
  name,
}: {
  term: number;
  name: string;
}) {
  const currentTerm = { term: 5 };
  // const [{ data: currentTerm }, { data: myClubData }, { data: reports }] =
  const [{ data: temp }, { data: myClubData }, { data: reports }] =
    useSuspenseQueries({
      queries: [
        reportQueryOptions.currentTerm(),
        clubQueryOptions.my(),
        reportQueryOptions.termReport(term),
      ],
    });

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
      <EditButton term={term} />
    </>
  );
}
