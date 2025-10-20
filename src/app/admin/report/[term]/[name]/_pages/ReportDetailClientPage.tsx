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

type ReportDetailClientPageProps = {
  term: number;
  name: string;
};

export function ReportDetailClientPage({
  term,
  name,
}: ReportDetailClientPageProps) {
  const { isOpen, openModal, closeModal } = usePortal();
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

  const deleteMutation = useDeleteReport();
  if (!reports) return;

  return (
    <>
      <Flex
        justifyContent="between"
        className="flex-col py-7 md:flex-row md:items-center md:py-10"
      >
        <Title1 weight="bold">활동보고서 관리</Title1>
        <Body3 weight="normal">제출일시 {reports[0]?.createdAt}</Body3>
      </Flex>
      <Title3>
        {term}회차 / {name}
      </Title3>
      <Accordion type="multiple" className="mt-5 w-full md:mt-10">
        <AccordionItem trigger={<Body3>활동 1</Body3>} value="1">
          <Report reportData={reports[0]} term={Number(term)} />
        </AccordionItem>
        <AccordionItem trigger={<Body3>활동 2</Body3>} value="2">
          <Report reportData={reports[1]} term={Number(term)} />
        </AccordionItem>
      </Accordion>
      <Flex className="m-auto mt-10 w-fit">
        <DoubleButton
          left={
            <Button
              variant="primary"
              color="red"
              className={`${currentTerm.term !== term && 'hidden'}`}
              onClick={() => openModal()}
            >
              <Body2 weight="bold">삭제</Body2>
            </Button>
          }
          right={
            <Link href={`/report/${term}/${name}/fix`}>
              <Button
                variant="primary"
                color="blue"
                className={`${currentTerm.term !== term && 'hidden'} `}
              >
                <Body2 weight="bold">수정</Body2>
              </Button>
            </Link>
          }
        />
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        onDeleteReport={() => deleteMutation.mutate(term)}
      />
    </>
  );
}
